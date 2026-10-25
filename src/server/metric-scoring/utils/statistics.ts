import { PERCENTILE_POINTS } from '@/server/metric-scoring/constants';

const HUNDRED = 100;

export const round2 = (value: number) => Math.round(value * HUNDRED) / HUNDRED;

export const mean = (values: number[]) => {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const median = (values: number[]) => percentile(values, 50);

export const percentile = (values: number[], point: number) => {
  if (values.length === 0) return null;
  const sorted = values.toSorted((left, right) => left - right);
  const rank = (point / HUNDRED) * (sorted.length - 1);
  const low = Math.floor(rank);
  const high = Math.ceil(rank);
  return sorted[low] + (sorted[high] - sorted[low]) * (rank - low);
};

export const percentileSet = (values: number[]) =>
  Object.fromEntries(
    PERCENTILE_POINTS.map((point) => [
      `p${point}`,
      round2(percentile(values, point) ?? 0),
    ]),
  );
