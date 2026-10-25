import type { LogAttributes, LogFields, LogFieldValue } from './types';

const isNestedFields = (value: LogFieldValue): value is LogFields =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof Date);

const writeField = (
  target: LogAttributes,
  key: string,
  value: LogFieldValue,
) => {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    target[key] = JSON.stringify(value);
    return;
  }
  if (value instanceof Date) {
    target[key] = value.toISOString();
    return;
  }
  if (isNestedFields(value)) {
    for (const [childKey, child] of Object.entries(value)) {
      writeField(target, `${key}.${childKey}`, child);
    }
    return;
  }
  target[key] = value;
};

export const flattenFields = (fields: LogFields): LogAttributes => {
  const result: LogAttributes = {};
  for (const [key, value] of Object.entries(fields)) {
    writeField(result, key, value);
  }
  return result;
};
