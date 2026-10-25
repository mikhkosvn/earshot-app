import 'server-only';

import type {
  ComparisonOperator,
  MetricEvalType,
} from '@/generated/prisma/enums';
import { conditionPasses } from '@/server/alerts/utils/condition-passes';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import type { MetricValue } from '@/server/metrics/types';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';
import { ruleValueOf } from '@/server/rubric/utils/rule-value';

export interface EvaluationValueParts {
  valueNumber: number | null;
  valueBoolean: boolean | null;
  valueText: string | null;
}

export interface FailureCheckMetric {
  evalType: MetricEvalType;
  predefinedMetric: { functionName: string | null } | null;
  rubricRule: {
    operator: ComparisonOperator;
    numberValue: number | null;
    booleanValue: boolean | null;
    textValues: string[];
  } | null;
}

export const evaluationValueOf = (parts: EvaluationValueParts): MetricValue =>
  valueFromParts({
    number: parts.valueNumber,
    boolean: parts.valueBoolean,
    text: parts.valueText,
  });

export const numericValueOf = (parts: EvaluationValueParts) => {
  const value = evaluationValueOf(parts);
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return Number(value);
  return null;
};

export const isFailingEvaluation = (
  metric: FailureCheckMetric,
  parts: EvaluationValueParts,
) => {
  const value = evaluationValueOf(parts);
  if (value === null) return false;
  const kind = rubricValueKind({
    evalType: metric.evalType,
    functionName: metric.predefinedMetric?.functionName ?? null,
  });
  if (metric.rubricRule) {
    const expected = ruleValueOf(kind, metric.rubricRule);
    if (expected !== null) {
      return !conditionPasses(
        kind,
        metric.rubricRule.operator,
        value,
        expected,
      );
    }
  }
  if (kind === RubricValueKind.boolean) return value === false;
  return false;
};
