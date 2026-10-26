import 'server-only';

import * as Sentry from '@sentry/nextjs';

import { EventOutcome } from '@/lib/logging/constants';
import type { LogFields, LogFieldValue } from '@/lib/logging/types';

import { describeError } from './errors/describe-error';
import type { ExternalCallFields } from './types';
import { wideEventStore } from './wide-event-store';

const SPAN_STATUS_ERROR = 2;
const EXPECTED_RESULT_ERROR_NAME = 'ActionError';

const isNestedFields = (value: LogFieldValue): value is LogFields =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof Date);

const mergeInto = (target: LogFields, fields: LogFields) => {
  for (const [key, value] of Object.entries(fields)) {
    const current = target[key];
    if (
      current !== undefined &&
      isNestedFields(current) &&
      isNestedFields(value)
    ) {
      mergeInto(current, value);
      continue;
    }
    target[key] = value;
  }
};

const isExpectedResult = (error: unknown) =>
  error instanceof Error && error.name === EXPECTED_RESULT_ERROR_NAME;

const appendToList = (key: string, item: LogFieldValue) => {
  const event = wideEventStore.getStore();
  if (!event) return;
  const list = event[key];
  if (Array.isArray(list)) {
    list.push(item);
    return;
  }
  event[key] = [item];
};

export const addEventFields = (fields: LogFields) => {
  const event = wideEventStore.getStore();
  if (!event) return;
  mergeInto(event, fields);
};

export const recordEventError = (error: unknown) => {
  const event = wideEventStore.getStore();
  if (!event) return;
  event.error = describeError(error);
};

export const recordCaughtError = (error: unknown) => {
  recordEventError(error);
  if (isExpectedResult(error)) return;
  Sentry.captureException(error);
};

export const markEventFailure = (statusCode: number) => {
  addEventFields({ outcome: EventOutcome.failure, status_code: statusCode });
  Sentry.getActiveSpan()?.setStatus({ code: SPAN_STATUS_ERROR });
};

export const recordExternalCall = (call: ExternalCallFields) =>
  appendToList('external_calls', call);

export const recordExternalError = (error: unknown) =>
  appendToList('external_errors', describeError(error));

export const recordStepFailure = (step: string, error: unknown) => {
  appendToList('failed_steps', { step, error: describeError(error) });
  if (isExpectedResult(error)) return;
  Sentry.captureException(error, { tags: { failed_step: step } });
};
