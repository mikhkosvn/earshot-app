import type { MetricValue } from '@/server/metrics/types';

const NUMBER_TOLERANCE = 1e-6;

export const valuesMatch = (expected: MetricValue, actual: MetricValue) => {
  if (typeof expected === 'number' && typeof actual === 'number') {
    return Math.abs(expected - actual) < NUMBER_TOLERANCE;
  }
  return expected === actual;
};
