import { MetricEvalType } from '@/generated/prisma/enums';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import type { MetricValue } from '@/server/metrics/types';

export const normalizeScore = (
  evalType: MetricEvalType,
  value: MetricValue,
): number | null => {
  if (value === null) return null;
  if (typeof value === 'boolean') return Number(value);
  if (typeof value !== 'number') return null;
  if (evalType === MetricEvalType.continuous_qualitative) {
    return Math.min(1, Math.max(0, value / RATING_SCALE_MAX));
  }
  return value;
};
