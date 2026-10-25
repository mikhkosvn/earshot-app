import {
  MAX_FIELD_DEPTH,
  MAX_STRING_LENGTH,
  REDACTED_VALUE,
  SECRET_FIELD_PATTERN,
} from './constants';
import type { LogFields, LogFieldValue } from './types';

const truncate = (value: string) => {
  if (value.length <= MAX_STRING_LENGTH) return value;
  return `${value.slice(0, MAX_STRING_LENGTH)}…`;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' &&
  value !== null &&
  Object.getPrototypeOf(value) === Object.prototype;

const redactValue = (value: unknown, depth: number): LogFieldValue => {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') return truncate(value);
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (typeof value === 'bigint') return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Error) return truncate(value.message);
  if (depth >= MAX_FIELD_DEPTH) return '[depth limit]';
  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, depth + 1));
  }
  if (isPlainObject(value)) return redactObject(value, depth + 1);
  return truncate(String(value));
};

const redactObject = (
  value: Record<string, unknown>,
  depth: number,
): LogFields => {
  const result: LogFields = {};
  for (const [key, item] of Object.entries(value)) {
    if (item === undefined) continue;
    if (SECRET_FIELD_PATTERN.test(key) && !isPlainObject(item)) {
      result[key] = REDACTED_VALUE;
      continue;
    }
    result[key] = redactValue(item, depth);
  }
  return result;
};

export const redactFields = (fields: Record<string, unknown>): LogFields =>
  redactObject(fields, 0);
