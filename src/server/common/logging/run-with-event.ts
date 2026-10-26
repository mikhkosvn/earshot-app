import 'server-only';

import { randomUUID } from 'node:crypto';

import * as Sentry from '@sentry/nextjs';
import { unstable_rethrow } from 'next/navigation';

import { EventOutcome } from '@/lib/logging/constants';
import { readServiceFields } from '@/lib/logging/read-service-fields';

import { EventKind, STATUS_CODE_SERVER_ERROR } from './constants';
import { emitEvent } from './emit-event';
import { describeError } from './errors/describe-error';
import { readTraceIds } from './trace/read-trace-ids';
import type { EventStart, WideEvent } from './types';
import { wideEventStore } from './wide-event-store';

const DIGEST_SEPARATOR = ';';
const PRERENDER_CONTROL_FLOW_PREFIX = 'NEXT_PRERENDER';
const REQUEST_KINDS = new Set<unknown>([
  EventKind.server_action,
  EventKind.route_handler,
]);

const readNextControlFlow = (error: unknown) => {
  try {
    unstable_rethrow(error);
    return null;
  } catch {
    if (typeof error !== 'object' || error === null) return String(error);
    const digest: unknown = Reflect.get(error, 'digest');
    if (typeof digest !== 'string') return String(error);
    return digest.split(DIGEST_SEPARATOR)[0];
  }
};

const createEvent = (start: EventStart): WideEvent => ({
  ...readServiceFields(),
  kind: start.kind,
  operation: start.operation,
  trigger: start.trigger,
  request_id: randomUUID(),
  parent_request_id: wideEventStore.getStore()?.request_id,
  ...readTraceIds(),
  started_at: new Date().toISOString(),
  ...start.fields,
});

const recordThrown = (event: WideEvent, error: unknown) => {
  const controlFlow = readNextControlFlow(error);
  if (controlFlow) {
    event.outcome = EventOutcome.interrupted;
    event.next_control_flow = controlFlow;
    return;
  }
  event.outcome = EventOutcome.failure;
  event.error = describeError(error);
  if (REQUEST_KINDS.has(event.kind)) {
    event.status_code ??= STATUS_CODE_SERVER_ERROR;
    return;
  }
  Sentry.captureException(error);
};

const isPrerenderInterrupt = (event: WideEvent) =>
  typeof event.next_control_flow === 'string' &&
  event.next_control_flow.startsWith(PRERENDER_CONTROL_FLOW_PREFIX);

const isQuietSkip = (start: EventStart, event: WideEvent) =>
  start.quietWhenSkipped === true &&
  event.outcome === EventOutcome.skipped &&
  event.failed_steps === undefined;

const shouldEmit = (start: EventStart, event: WideEvent) =>
  !isQuietSkip(start, event) && !isPrerenderInterrupt(event);

const runInSpan = <T>(start: EventStart, fn: () => Promise<T>) =>
  Sentry.startSpan({ name: start.operation, op: start.kind }, async (span) => {
    const event = createEvent(start);
    const startedMs = performance.now();
    try {
      const result = await wideEventStore.run(event, fn);
      event.outcome ??= EventOutcome.success;
      return result;
    } catch (error) {
      recordThrown(event, error);
      throw error;
    } finally {
      event.duration_ms = Math.round(performance.now() - startedMs);
      if (shouldEmit(start, event)) emitEvent(event, span);
    }
  });

export const runWithEvent = <T>(
  start: EventStart,
  fn: () => Promise<T>,
): Promise<T> => {
  if (start.newTrace) return Sentry.startNewTrace(() => runInSpan(start, fn));
  return runInSpan(start, fn);
};
