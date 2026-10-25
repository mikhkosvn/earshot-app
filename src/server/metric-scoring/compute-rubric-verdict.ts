import 'server-only';

import { ComparisonOperator } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { RubricLogic } from '@/server/metric-scoring/constants';
import type {
  ComputeRubricVerdictInput,
  RubricBreakdownItem,
  RubricCondition,
  RubricVerdict,
} from '@/server/metric-scoring/types';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import {
  RubricField,
  RubricValueKind,
} from '@/server/metrics/constants/rubric/rubric-value-kind';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import type { MetricValue } from '@/server/metrics/types';
import type { RubricRuleValue } from '@/server/rubric/types';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';
import { ruleValueOf } from '@/server/rubric/utils/rule-value';

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

const passes = (
  kind: RubricValueKind,
  operator: ComparisonOperator,
  actual: MetricValue,
  expected: RubricRuleValue,
) => {
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
  if (typeof actual !== 'number' || typeof expected !== 'number') return false;
  return compareNumbers(operator, actual, expected);
};

const conditionValue = (
  kind: RubricValueKind,
  operator: ComparisonOperator,
  value: Exclude<RubricRuleValue, null>,
) => {
  if (kind !== RubricValueKind.enum || !Array.isArray(value)) return value;
  if (operator === ComparisonOperator.in) return value;
  return value[0];
};

const fieldOf = (kind: RubricValueKind) => {
  if (kind === RubricValueKind.enum) return RubricField.enum;
  return RubricField.score;
};

const conditionText = (condition: RubricCondition) =>
  `${condition.field} ${condition.op} ${JSON.stringify(condition.value)}`;

export const computeRubricVerdict = async ({
  conversationId,
}: ComputeRubricVerdictInput): Promise<RubricVerdict> => {
  const conversation = await prisma.conversation.findUniqueOrThrow({
    where: { id: conversationId },
    select: { projectId: true },
  });
  const metrics = await prisma.metric.findMany({
    where: { projectId: conversation.projectId, rubricRule: { isNot: null } },
    select: {
      id: true,
      name: true,
      evalType: true,
      predefinedMetric: { select: { functionName: true } },
      rubricRule: true,
      evaluations: {
        where: { conversationId },
        select: {
          valueNumber: true,
          valueBoolean: true,
          valueText: true,
          explanation: true,
        },
      },
    },
  });
  const items = metrics
    .toSorted(
      (left, right) =>
        (left.rubricRule?.position ?? 0) - (right.rubricRule?.position ?? 0),
    )
    .flatMap((metric): RubricBreakdownItem[] => {
      const rule = metric.rubricRule;
      const evaluation = metric.evaluations[0];
      if (!rule || !evaluation) return [];
      const kind = rubricValueKind({
        evalType: metric.evalType,
        functionName: metric.predefinedMetric?.functionName ?? null,
      });
      const expected = ruleValueOf(kind, rule);
      const actual = valueFromParts({
        number: evaluation.valueNumber,
        boolean: evaluation.valueBoolean,
        text: evaluation.valueText,
      });
      if (expected === null || actual === null) return [];
      const condition: RubricCondition = {
        op: rule.operator,
        field: fieldOf(kind),
        value: conditionValue(kind, rule.operator, expected),
      };
      return [
        {
          metricId: metric.id,
          metricName: metric.name,
          value: actual,
          passed: passes(kind, rule.operator, actual, expected),
          conditions: conditionText(condition),
          explanation: evaluation.explanation,
          expectedConditions: {
            operator: RubricLogic.and,
            conditions: [condition],
          },
        },
      ];
    });
  const passedCount = items.filter((item) => item.passed).length;
  return {
    passed: passedCount === items.length,
    passedCount,
    failedCount: items.length - passedCount,
    items,
  };
};
