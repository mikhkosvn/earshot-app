import 'server-only';

import { z } from 'zod';

import {
  CODE_RUNNER_REQUEST_TIMEOUT_MS,
  CODE_RUNNER_TIMEOUT_SECONDS,
  DEFAULT_CODE_RUNNER_URL,
  MAX_JUDGE_ROUNDS,
} from '@/server/metric-scoring/constants';
import type { JudgeResult } from '@/server/metric-scoring/judge/judge-mock';
import { metricValueSchema } from '@/server/metrics/schemas';
import type { MetricValue } from '@/server/metrics/types';

const judgeRequestSchema = z.object({
  key: z.string(),
  description: z.string(),
  eval_type: z.string(),
});

const runnerResponseSchema = z.object({
  ok: z.boolean(),
  result: metricValueSchema.optional(),
  explanation: z.unknown().optional(),
  error: z.string().nullable().optional(),
  judge_request: judgeRequestSchema.nullable().optional(),
});

export type JudgeRequest = z.output<typeof judgeRequestSchema>;

export interface PythonRun {
  ok: boolean;
  result: MetricValue;
  explanation: unknown;
  error: string | null;
}

interface RunPythonArgs {
  code: string;
  data: Record<string, unknown>;
  onJudgeRequest: (request: JudgeRequest) => Promise<JudgeResult>;
}

const runnerUrl = () => process.env.CODE_RUNNER_URL || DEFAULT_CODE_RUNNER_URL;

const callRunner = async (body: Record<string, unknown>) => {
  let response: Response;
  try {
    response = await fetch(`${runnerUrl()}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(CODE_RUNNER_REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error('The Python code runner is not available.', {
      cause: error,
    });
  }
  if (!response.ok) {
    throw new Error(`The Python code runner answered ${response.status}.`);
  }
  return runnerResponseSchema.parse(await response.json());
};

export const runPython = async ({
  code,
  data,
  onJudgeRequest,
}: RunPythonArgs): Promise<PythonRun> => {
  const judgeResults: Record<string, JudgeResult> = {};
  for (let round = 0; round <= MAX_JUDGE_ROUNDS; round += 1) {
    const payload = await callRunner({
      code,
      data,
      timeout_seconds: CODE_RUNNER_TIMEOUT_SECONDS,
      judge_results: judgeResults,
    });
    if (payload.judge_request) {
      judgeResults[payload.judge_request.key] = await onJudgeRequest(
        payload.judge_request,
      );
      continue;
    }
    return {
      ok: payload.ok,
      result: payload.result ?? null,
      explanation: payload.explanation ?? '',
      error: payload.error ?? null,
    };
  }
  return {
    ok: false,
    result: null,
    explanation: '',
    error: 'The code asked the LLM judge too many times.',
  };
};
