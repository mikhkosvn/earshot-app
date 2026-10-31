import 'server-only';

import {
  MetricEvalType,
  MetricEvaluationStatus,
} from '@/generated/prisma/enums';
import type {
  RubricBreakdownItem,
  RubricVerdict,
} from '@/server/metric-scoring/types';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import type { PublicRunRow } from '@/server/runs/public-api/utils/public-run-select';

type EvaluationRow = PublicRunRow['conversation']['metricEvaluations'][number];

const isFailed = (evaluation: EvaluationRow) =>
  evaluation.status === MetricEvaluationStatus.failed;

const scoreOf = (evaluation: EvaluationRow) => {
  if (isFailed(evaluation)) return null;
  return valueFromParts({
    number: evaluation.valueNumber,
    boolean: evaluation.valueBoolean,
    text: evaluation.valueText,
  });
};

const explanationOf = (evaluation: EvaluationRow) => {
  if (!isFailed(evaluation)) return evaluation.explanation;
  if (!evaluation.errorMessage) return [];
  return [evaluation.errorMessage];
};

const passedOf = (
  evaluation: EvaluationRow,
  rubricPassed: Map<number, boolean>,
) => {
  const fromRubric = rubricPassed.get(evaluation.metricId);
  if (fromRubric !== undefined) return { passed: fromRubric };
  if (
    evaluation.metric.evalType === MetricEvalType.binary &&
    evaluation.valueBoolean !== null
  ) {
    return { passed: evaluation.valueBoolean };
  }
  return {};
};

export const toPublicRunMetrics = (
  evaluations: EvaluationRow[],
  rubric: RubricVerdict,
) => {
  const rubricPassed = new Map(
    rubric.items.map((item) => [item.metricId, item.passed]),
  );
  return evaluations.map((evaluation) => ({
    id: evaluation.metricId,
    name: evaluation.metric.name,
    type: evaluation.metric.type,
    eval_type: evaluation.metric.evalType,
    score: scoreOf(evaluation),
    score_normalized: evaluation.normalizedScore,
    ...passedOf(evaluation, rubricPassed),
    explanation: explanationOf(evaluation),
    extra: evaluation.extra,
    vocera_defined_metric_code: evaluation.metric.predefinedMetric?.code ?? null,
    function_name: evaluation.metric.predefinedMetric?.functionName ?? null,
  }));
};

export const toPublicRubricItem = (item: RubricBreakdownItem) => ({
  metric_id: item.metricId,
  metric_name: item.metricName,
  value: item.value,
  passed: item.passed,
  conditions: item.conditions,
  explanation: item.explanation,
  expected_conditions: item.expectedConditions,
});
