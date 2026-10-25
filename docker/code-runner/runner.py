import json
import os
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = int(os.environ.get("CODE_RUNNER_PORT", "8000"))
MAX_BODY_BYTES = 5 * 1024 * 1024
MAX_TIMEOUT_SECONDS = 30
MEMORY_LIMIT_BYTES = 256 * 1024 * 1024

WORKER = r'''
import builtins
import json
import resource
import socket
import sys

limits = json.loads(sys.argv[1])
resource.setrlimit(resource.RLIMIT_AS, (limits["memory"], limits["memory"]))
resource.setrlimit(resource.RLIMIT_CPU, (limits["cpu"], limits["cpu"]))


def _blocked(*args, **kwargs):
    raise PermissionError("Network access is not allowed in metric code.")


socket.socket = _blocked
socket.create_connection = _blocked
socket.getaddrinfo = _blocked

payload = json.loads(sys.stdin.read())
judge_results = payload.get("judge_results") or {}


class _JudgeRequest(BaseException):
    def __init__(self, request):
        super().__init__("judge request")
        self.request = request


def evaluate_llm_judge_metric(data, description="", eval_type="binary", **kwargs):
    key = str(eval_type) + ":" + str(description)
    if key in judge_results:
        return judge_results[key]
    raise _JudgeRequest({"key": key, "description": str(description), "eval_type": str(eval_type)})


def _plain(value):
    if value is None or isinstance(value, (bool, int, float, str)):
        return value
    return str(value)


def _explanation(value):
    if isinstance(value, (list, tuple)):
        return [str(item) for item in value]
    if value is None:
        return ""
    return str(value)


scope = {
    "__builtins__": builtins,
    "__name__": "__metric__",
    "data": payload.get("data") or {},
    "evaluate_llm_judge_metric": evaluate_llm_judge_metric,
}
try:
    exec(compile(payload.get("code") or "", "<metric>", "exec"), scope)
    output = {
        "ok": True,
        "result": _plain(scope.get("_result")),
        "explanation": _explanation(scope.get("_explanation")),
        "error": None,
        "judge_request": None,
    }
except _JudgeRequest as request:
    output = {"ok": True, "result": None, "explanation": "", "error": None, "judge_request": request.request}
except BaseException as error:
    output = {
        "ok": False,
        "result": None,
        "explanation": "",
        "error": type(error).__name__ + ": " + str(error),
        "judge_request": None,
    }
sys.stdout.write(json.dumps(output, default=str))
'''


def run_code(payload):
    timeout = min(int(payload.get("timeout_seconds") or 10), MAX_TIMEOUT_SECONDS)
    limits = json.dumps({"memory": MEMORY_LIMIT_BYTES, "cpu": timeout + 1})
    try:
        completed = subprocess.run(
            [sys.executable, "-I", "-S", "-c", WORKER, limits],
            input=json.dumps(payload),
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd="/tmp",
            env={"PYTHONHASHSEED": "0"},
        )
    except subprocess.TimeoutExpired:
        return {"ok": False, "error": "The code ran longer than " + str(timeout) + " seconds."}
    if completed.returncode != 0 or not completed.stdout:
        return {"ok": False, "error": last_error_line(completed.stderr)}
    return json.loads(completed.stdout)


def last_error_line(stderr):
    lines = (stderr or "").strip().splitlines()
    if not lines:
        return "The code process stopped."
    return lines[-1]


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body):
        data = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path == "/health":
            self._send(200, {"ok": True})
            return
        self._send(404, {"ok": False, "error": "Not found."})

    def do_POST(self):
        if self.path != "/run":
            self._send(404, {"ok": False, "error": "Not found."})
            return
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BODY_BYTES:
            self._send(413, {"ok": False, "error": "The request body is empty or too large."})
            return
        try:
            payload = json.loads(self.rfile.read(length))
        except ValueError:
            self._send(400, {"ok": False, "error": "The request body is not JSON."})
            return
        self._send(200, run_code(payload))

    def log_message(self, format, *args):
        sys.stderr.write("[code-runner] " + (format % args) + "\n")


if __name__ == "__main__":
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()
