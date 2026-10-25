import { ChangeDirection } from '@/generated/prisma/enums';

export interface TrendCheckInput {
  history: number[];
  window: number[];
  windowSize: number;
  stdMultiplier: number;
  ewmaAlpha: number;
  direction: ChangeDirection;
}

export interface TrendCheckResult {
  fired: boolean;
  baseline: number | null;
  windowMean: number | null;
  deviation: number | null;
  limit: number | null;
}

const NOT_READY: TrendCheckResult = {
  fired: false,
  baseline: null,
  windowMean: null,
  deviation: null,
  limit: null,
};

const average = (values: readonly number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const ewmaOf = (values: readonly number[], alpha: number) =>
  values
    .slice(1)
    .reduce((level, value) => alpha * value + (1 - alpha) * level, values[0]);

export const standardDeviationOf = (values: readonly number[]) => {
  const center = average(values);
  return Math.sqrt(average(values.map((value) => (value - center) ** 2)));
};

const directionMatches = (
  direction: ChangeDirection,
  deviation: number,
  limit: number,
) => {
  if (deviation === 0) return false;
  if (direction === ChangeDirection.increase) return deviation > limit;
  if (direction === ChangeDirection.decrease) return -deviation > limit;
  return Math.abs(deviation) > limit;
};

export const checkTrend = ({
  history,
  window,
  windowSize,
  stdMultiplier,
  ewmaAlpha,
  direction,
}: TrendCheckInput): TrendCheckResult => {
  if (window.length < windowSize || history.length < windowSize) {
    return NOT_READY;
  }
  const baseline = ewmaOf(history, ewmaAlpha);
  const windowMean = average(window);
  const deviation = windowMean - baseline;
  const limit = stdMultiplier * standardDeviationOf(history);
  return {
    fired: directionMatches(direction, deviation, limit),
    baseline,
    windowMean,
    deviation,
    limit,
  };
};
