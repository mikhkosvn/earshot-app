import 'server-only';

import { randomBytes } from 'node:crypto';

import * as Sentry from '@sentry/nextjs';

import { TraceHeader } from '../constants';
import type { TraceContext } from '../types';
import { readTraceIds } from './read-trace-ids';

const SPAN_ID_BYTES = 8;
const TRACEPARENT_VERSION = '00';
const TRACEPARENT_SAMPLED_FLAGS = '01';

const fallbackTraceparent = () => {
  const { trace_id } = readTraceIds();
  const spanId = randomBytes(SPAN_ID_BYTES).toString('hex');
  return `${TRACEPARENT_VERSION}-${trace_id}-${spanId}-${TRACEPARENT_SAMPLED_FLAGS}`;
};

export const readOutgoingTraceContext = (): TraceContext => {
  const data = Sentry.getTraceData({ propagateTraceparent: true });
  const sentryTrace = data[TraceHeader.sentry_trace];
  if (!sentryTrace) {
    return { [TraceHeader.traceparent]: fallbackTraceparent() };
  }
  return {
    [TraceHeader.sentry_trace]: sentryTrace,
    [TraceHeader.baggage]: data[TraceHeader.baggage],
    [TraceHeader.traceparent]: data[TraceHeader.traceparent],
  };
};
