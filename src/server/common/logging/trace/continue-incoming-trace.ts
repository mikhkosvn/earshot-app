import 'server-only';

import * as Sentry from '@sentry/nextjs';

import { TraceHeader } from '../constants';

type TraceCarrier = Partial<Record<string, string>>;

const TRACEPARENT_PATTERN = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;
const HEX_RADIX = 16;
const SAMPLED_FLAG = 1;

const toSentryTrace = (traceparent: string | undefined) => {
  if (!traceparent) return undefined;
  const match = TRACEPARENT_PATTERN.exec(traceparent);
  if (!match) return undefined;
  const [, traceId, spanId, flags] = match;
  const sampled = Number.parseInt(flags, HEX_RADIX) & SAMPLED_FLAG;
  return `${traceId}-${spanId}-${sampled}`;
};

export const continueIncomingTrace = <T>(
  carrier: TraceCarrier,
  fn: () => T,
): T => {
  const sentryTrace =
    carrier[TraceHeader.sentry_trace] ??
    toSentryTrace(carrier[TraceHeader.traceparent]);
  if (!sentryTrace) return fn();
  return Sentry.continueTrace(
    { sentryTrace, baggage: carrier[TraceHeader.baggage] },
    fn,
  );
};
