import 'server-only';

import * as Sentry from '@sentry/nextjs';

export const readTraceIds = () => {
  const span = Sentry.getActiveSpan();
  if (span) {
    const { traceId, spanId } = span.spanContext();
    return { trace_id: traceId, span_id: spanId };
  }
  return {
    trace_id: Sentry.getCurrentScope().getPropagationContext().traceId,
  };
};
