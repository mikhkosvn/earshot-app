import { MetricEvalType } from '@/generated/prisma/enums';
import type { MetricValue } from '@/server/metrics/types';

const TRUE_TEXT = ['true', 'yes', 'pass', 'passed'];
const FALSE_TEXT = ['false', 'no', 'fail', 'failed'];

const toBoolean = (value: MetricValue): boolean | null => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value !== 'string') return null;
  const text = value.trim().toLowerCase();
  if (TRUE_TEXT.includes(text)) return true;
  if (FALSE_TEXT.includes(text)) return false;
  return null;
};

const toNumber = (value: MetricValue): number | null => {
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return Number(value);
  if (typeof value !== 'string' || !value.trim()) return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return parsed;
};

const toText = (value: MetricValue): string | null => {
  if (value === null) return null;
  return String(value);
};

export const coerceValue = (
  evalType: MetricEvalType,
  value: MetricValue,
): MetricValue => {
  if (evalType === MetricEvalType.binary) return toBoolean(value);
  if (evalType === MetricEvalType.enum) return toText(value);
  return toNumber(value);
};

export const explanationLines = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === 'string' && value.trim()) return [value];
  if (value === null || value === undefined || value === '') return [];
  return [JSON.stringify(value)];
};
