const TRAILING_SLASH_PATTERN = /\/+$/;

export const readServerTraceTargets = () =>
  [process.env.CALL_SERVICE_URL, process.env.CODE_RUNNER_URL]
    .filter((url): url is string => Boolean(url))
    .map((url) => url.replace(TRAILING_SLASH_PATTERN, ''));
