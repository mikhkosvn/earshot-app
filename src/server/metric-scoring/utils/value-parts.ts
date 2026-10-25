import type { MetricValue } from '@/server/metrics/types';

export interface ValueParts {
  number: number | null;
  boolean: boolean | null;
  text: string | null;
}

export const valueParts = (value: MetricValue): ValueParts => {
  if (typeof value === 'boolean') {
    return { number: null, boolean: value, text: null };
  }
  if (typeof value === 'number') {
    return { number: value, boolean: null, text: null };
  }
  if (typeof value === 'string') {
    return { number: null, boolean: null, text: value };
  }
  return { number: null, boolean: null, text: null };
};

export const valueFromParts = (parts: ValueParts): MetricValue => {
  if (parts.boolean !== null) return parts.boolean;
  if (parts.number !== null) return parts.number;
  return parts.text;
};
