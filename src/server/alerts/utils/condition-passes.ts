import 'server-only';

import { ComparisonOperator } from '@/generated/prisma/enums';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import type { MetricValue } from '@/server/metrics/types';
import type { RubricRuleValue } from '@/server/rubric/types';

const compareNumbers = (
  operator: ComparisonOperator,
  actual: number,
  expected: number,
) => {
  if (operator === ComparisonOperator.gt) return actual > expected;
  if (operator === ComparisonOperator.gte) return actual >= expected;
  if (operator === ComparisonOperator.lt) return actual < expected;
  if (operator === ComparisonOperator.lte) return actual <= expected;
  if (operator === ComparisonOperator.neq) return actual !== expected;
  return actual === expected;
};

const booleanOf = (value: MetricValue) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value >= RATING_SCALE_MAX;
  return null;
};

export const conditionPasses = (
  kind: RubricValueKind,
  operator: ComparisonOperator,
  actual: MetricValue,
  expected: RubricRuleValue,
) => {
  if (actual === null || expected === null) return true;
  if (kind === RubricValueKind.boolean) {
    const matches = booleanOf(actual) === expected;
    if (operator === ComparisonOperator.neq) return !matches;
    return matches;
  }
  if (kind === RubricValueKind.enum && Array.isArray(expected)) {
    const included = expected.includes(String(actual));
    if (operator === ComparisonOperator.neq) return !included;
    return included;
  }
  if (typeof actual !== 'number' || typeof expected !== 'number') return true;
  return compareNumbers(operator, actual, expected);
};
