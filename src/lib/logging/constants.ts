export const LOG_SERVICE_NAME = 'earshot-app';

export const EventOutcome = {
  success: 'success',
  failure: 'failure',
  cancelled: 'cancelled',
  skipped: 'skipped',
  interrupted: 'interrupted',
} as const;
export type EventOutcome = (typeof EventOutcome)[keyof typeof EventOutcome];

export const TriggerType = {
  user: 'user',
  page: 'page',
  background: 'background',
  programmatic: 'programmatic',
} as const;
export type TriggerType = (typeof TriggerType)[keyof typeof TriggerType];

export const LogLevel = {
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const;
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const SECRET_FIELD_PATTERN =
  /^(password|secret|token|api_?key|authorization|cookie|dsn)$|_(password|secret|token|api_?key)$/i;
export const REDACTED_VALUE = '[redacted]';
export const MAX_FIELD_DEPTH = 6;
export const MAX_STRING_LENGTH = 4000;
