import type { Query } from '@tanstack/react-query';

import { EventOutcome, TriggerType } from '../constants';
import { emitOperationEvent } from './emit-operation-event';
import { readBrowserErrorFields } from './read-browser-error-fields';
import { readOperationName } from './read-operation-name';

const readTrigger = (query: Query<unknown, unknown, unknown>) => {
  if (query.meta?.trigger) return query.meta.trigger;
  if (query.state.dataUpdateCount > 0) return TriggerType.background;
  return TriggerType.page;
};

export const recordQueryFailureEvent = (
  error: Error,
  query: Query<unknown, unknown, unknown>,
) =>
  emitOperationEvent({
    operation: readOperationName(query.queryKey),
    trigger: readTrigger(query),
    trigger_source: query.meta?.triggerSource,
    attempt: query.state.fetchFailureCount,
    outcome: EventOutcome.failure,
    error: readBrowserErrorFields(error),
    ...query.meta?.fields,
  });
