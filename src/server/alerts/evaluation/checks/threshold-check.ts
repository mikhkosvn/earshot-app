import { ThresholdOperator } from '@/generated/prisma/enums';

export interface ThresholdCheckInput {
  values: number[];
  operator: ThresholdOperator;
  value: number;
  upperValue: number | null;
  minBreaches: number;
}

export interface ThresholdCheckResult {
  fired: boolean;
  breaches: number;
  latest: number | null;
}

export const isThresholdBreach = (
  operator: ThresholdOperator,
  actual: number,
  value: number,
  upperValue: number | null,
) => {
  if (operator === ThresholdOperator.gt) return actual > value;
  if (operator === ThresholdOperator.lt) return actual < value;
  return actual < value || actual > (upperValue ?? value);
};

export const checkThreshold = ({
  values,
  operator,
  value,
  upperValue,
  minBreaches,
}: ThresholdCheckInput): ThresholdCheckResult => {
  const latest = values.at(-1) ?? null;
  const breaches = values.filter((actual) =>
    isThresholdBreach(operator, actual, value, upperValue),
  ).length;
  if (latest === null) return { fired: false, breaches, latest };
  const latestBreach = isThresholdBreach(operator, latest, value, upperValue);
  return { fired: latestBreach && breaches >= minBreaches, breaches, latest };
};
