import type { MetricValue } from '@/server/metrics/types';

import { EMPTY_VALUE } from '../_constants/result-detail';

const numberFormat = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

export const formatNumber = (value: number) => numberFormat.format(value);

export const formatPercent = (value: number) => `${Math.round(value)}%`;

export const formatOptionalNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return EMPTY_VALUE;
  return formatNumber(value);
};

export const metricValueText = (value: MetricValue) => {
  if (value === null) return EMPTY_VALUE;
  if (typeof value === 'number') return formatNumber(value);
  if (value === true) return 'True';
  if (value === false) return 'False';
  return value;
};

export const formatWithUnit = (
  value: number | null | undefined,
  unit: string,
) => {
  if (value === null || value === undefined) return EMPTY_VALUE;
  return `${formatNumber(value)} ${unit}`;
};
