import * as Sentry from '@sentry/nextjs';

import { EventOutcome, LogLevel } from '../constants';
import { flattenFields } from '../flatten-fields';
import { readServiceFields } from '../read-service-fields';
import { redactFields } from '../redact-fields';
import type { LogFields } from '../types';
import { readBrowserTraceId } from './read-browser-trace-id';
import { readRouteTemplate } from './read-route-template';

const OPERATION_EVENT_KIND = 'browser_operation';

const readLevel = (fields: LogFields): LogLevel => {
  if (fields.outcome === EventOutcome.failure) return LogLevel.error;
  return LogLevel.info;
};

const writeDevelopmentLine = (fields: LogFields) => {
  if (process.env.NODE_ENV !== 'development') return;
  console.info(JSON.stringify(fields));
};

export const emitOperationEvent = (fields: LogFields) => {
  const event = redactFields({
    ...readServiceFields(),
    kind: OPERATION_EVENT_KIND,
    route: readRouteTemplate(),
    trace_id: readBrowserTraceId(),
    ...fields,
  });
  writeDevelopmentLine(event);
  Sentry.logger[readLevel(event)](
    `${OPERATION_EVENT_KIND} ${String(event.operation)}`,
    flattenFields(event),
  );
};
