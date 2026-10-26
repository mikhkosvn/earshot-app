import * as Sentry from '@sentry/nextjs';

const SENTRY_TRACE_HEADER = 'sentry-trace';
const SENTRY_TRACE_SEPARATOR = '-';

export const readBrowserTraceId = () => {
  const sentryTrace = Sentry.getTraceData()[SENTRY_TRACE_HEADER];
  if (sentryTrace) return sentryTrace.split(SENTRY_TRACE_SEPARATOR)[0];
  return Sentry.getCurrentScope().getPropagationContext().traceId;
};
