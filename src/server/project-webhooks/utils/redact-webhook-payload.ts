import 'server-only';

import { RedactionField } from '@/generated/prisma/enums';
import type { WebhookPayload } from '@/server/project-webhooks/types';

const VALUE_PATTERNS: Partial<Record<RedactionField, RegExp>> = {
  [RedactionField.email_address]: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,
  [RedactionField.url]: /https?:\/\/[^\s"'<>]+/gi,
  [RedactionField.ssn]: /\b\d{3}-\d{2}-\d{4}\b/g,
  [RedactionField.credit_card]: /\b(?:\d[ -]?){13,18}\d\b/g,
  [RedactionField.ip_address]: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  [RedactionField.phone_number]:
    /\+\d[\d\s().-]{6,}\d|\(\d{3}\)\s?\d{3}[-.\s]?\d{4}\b|\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b|\b\d{10,15}\b/g,
};

const KEY_ALIASES: Partial<Record<RedactionField, string[]>> = {
  [RedactionField.phone_number]: [
    'phone',
    'customer_number',
    'outbound_phone_number',
  ],
  [RedactionField.email_address]: ['email'],
  [RedactionField.person_name]: ['name', 'first_name', 'last_name'],
  [RedactionField.dob]: ['date_of_birth', 'birthday'],
};

const isPatternField = (key: string): key is RedactionField =>
  key in VALUE_PATTERNS;

const PATTERN_ORDER = Object.keys(VALUE_PATTERNS).filter(isPatternField);

const placeholderFor = (field: RedactionField) => `[${field.toUpperCase()}]`;

const redactText = (text: string, fields: Set<RedactionField>) =>
  PATTERN_ORDER.filter((field) => fields.has(field)).reduce(
    (current, field) =>
      current.replace(VALUE_PATTERNS[field] ?? /$^/, placeholderFor(field)),
    text,
  );

const fieldForKey = (key: string, fields: Set<RedactionField>) =>
  [...fields].find(
    (field) => field === key || KEY_ALIASES[field]?.includes(key),
  );

const redactValue = (value: unknown, fields: Set<RedactionField>): unknown => {
  if (typeof value === 'string') return redactText(value, fields);
  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, fields));
  }
  if (value && typeof value === 'object') return redactRecord(value, fields);
  return value;
};

const redactRecord = (
  record: object,
  fields: Set<RedactionField>,
): WebhookPayload =>
  Object.fromEntries(
    Object.entries(record).map(([key, item]) => {
      const field = fieldForKey(key, fields);
      if (field && item !== null && typeof item !== 'object') {
        return [key, placeholderFor(field)];
      }
      return [key, redactValue(item, fields)];
    }),
  );

export const redactWebhookPayload = (
  payload: WebhookPayload,
  fields: RedactionField[],
): WebhookPayload => {
  if (fields.length === 0) return payload;
  return redactRecord(payload, new Set(fields));
};
