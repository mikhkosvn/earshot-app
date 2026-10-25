import type {
  MetricValue,
  PatternCorrectionView,
} from '@/server/metrics/types';

export const metricValueText = (value: MetricValue) => {
  if (value === true) return 'Pass';
  if (value === false) return 'Fail';
  if (value === null) return 'N/A';
  return String(value);
};

export const metricValueClassName = (value: MetricValue) => {
  if (value === true) return 'text-emerald-700 dark:text-emerald-400';
  if (value === false) return 'text-red-600 dark:text-red-400';
  return 'text-muted-foreground';
};

export const isCorrectionValue = (
  correction: PatternCorrectionView | null,
  value: MetricValue,
) => correction !== null && correction.value === value;

export const numberDraftOf = (correction: PatternCorrectionView | null) => {
  if (typeof correction?.value !== 'number') return '';
  return String(correction.value);
};

export const enumSelectionOf = (correction: PatternCorrectionView | null) => {
  if (typeof correction?.value !== 'string') return null;
  return correction.value;
};
