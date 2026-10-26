import 'server-only';

import * as Sentry from '@sentry/nextjs';

import { EventOutcome, LogLevel } from '@/lib/logging/constants';
import { flattenFields } from '@/lib/logging/flatten-fields';
import { redactFields } from '@/lib/logging/redact-fields';
import type { LogFields } from '@/lib/logging/types';

import type { WideEvent } from './types';

const LINE_WRITERS: Record<LogLevel, (line: string) => void> = {
  [LogLevel.info]: (line) => console.info(line),
  [LogLevel.warn]: (line) => console.warn(line),
  [LogLevel.error]: (line) => console.error(line),
};

const readLevel = (event: LogFields): LogLevel => {
  if (event.outcome === EventOutcome.failure) return LogLevel.error;
  if (Array.isArray(event.failed_steps)) return LogLevel.warn;
  return LogLevel.info;
};

export const emitEvent = (event: WideEvent, span: Sentry.Span | undefined) => {
  const safeEvent = redactFields(event);
  const level = readLevel(safeEvent);
  const attributes = flattenFields(safeEvent);
  LINE_WRITERS[level](JSON.stringify(safeEvent));
  Sentry.logger[level](
    `${String(safeEvent.kind)} ${String(safeEvent.operation)}`,
    attributes,
  );
  if (span) Sentry.getRootSpan(span).setAttributes(attributes);
};
