import type { Mutation } from '@tanstack/react-query';

import { isActionResult } from '@/lib/action-result';

import { EventOutcome, TriggerType } from '../constants';
import type { LogFields } from '../types';
import { emitOperationEvent } from './emit-operation-event';
import { readBrowserErrorFields } from './read-browser-error-fields';
import { readOperationName } from './read-operation-name';

const MUTATION_ID_PREFIX = 'mutation-';

const readResultFields = (data: unknown, error: unknown): LogFields => {
  if (error) {
    return {
      outcome: EventOutcome.failure,
      error: readBrowserErrorFields(error),
    };
  }
  if (isActionResult(data) && !data.ok) {
    return {
      outcome: EventOutcome.failure,
      status_code: data.status,
      error: { type: 'ActionResult', message: data.error },
    };
  }
  return { outcome: EventOutcome.success };
};

export const recordMutationEvent = (
  data: unknown,
  error: unknown,
  mutation: Mutation<unknown, unknown, unknown>,
) => {
  const meta = mutation.meta;
  emitOperationEvent({
    operation: readOperationName(mutation.options.mutationKey),
    operation_id: `${MUTATION_ID_PREFIX}${mutation.mutationId}`,
    parent_operation_id: meta?.parentOperationId,
    trigger: meta?.trigger ?? TriggerType.user,
    trigger_source: meta?.triggerSource,
    attempt: mutation.state.failureCount + 1,
    duration_ms: Date.now() - mutation.state.submittedAt,
    ...readResultFields(data, error),
    ...meta?.fields,
  });
};
