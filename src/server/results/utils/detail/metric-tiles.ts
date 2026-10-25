import 'server-only';

import { MetricEvalType } from '@/generated/prisma/enums';
import { mean, round2 } from '@/server/metric-scoring/utils/statistics';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { RubricValueKind } from '@/server/metrics/constants/rubric/rubric-value-kind';
import type { MetricValue } from '@/server/metrics/types';
import { TileUnit } from '@/server/results/constants/tile-unit';
import type { ResultMetricTile, TileRun } from '@/server/results/types';
import type {
  DetailMetric,
  ResultRunRecord,
} from '@/server/results/utils/detail/detail-record';
import { thresholdText } from '@/server/results/utils/detail/threshold-text';
import { rubricValueKind } from '@/server/rubric/utils/rubric-kind';

export type RunVerdicts = Map<number, Map<number, boolean>>;

const PERCENT = 100;

const runValue = (run: ResultRunRecord, metricId: number): MetricValue => {
  const evaluation = run.conversation.metricEvaluations.find(
    (item) => item.metricId === metricId,
  );
  if (!evaluation) return null;
  return valueFromParts({
    number: evaluation.valueNumber,
    boolean: evaluation.valueBoolean,
    text: evaluation.valueText,
  });
};

const tileRuns = (
  metric: DetailMetric,
  runs: ResultRunRecord[],
  verdicts: RunVerdicts,
): TileRun[] =>
  runs.flatMap((run) => {
    const value = runValue(run, metric.id);
    if (value === null) return [];
    return [
      { runId: run.id, value, passed: verdicts.get(run.id)?.get(metric.id) ?? null },
    ];
  });

const kindOf = (metric: DetailMetric) =>
  rubricValueKind({
    evalType: metric.evalType,
    functionName: metric.predefinedMetric?.functionName ?? null,
  });

const unitOf = (metric: DetailMetric): TileUnit => {
  if (metric.rubricRule && kindOf(metric) === RubricValueKind.boolean) {
    return TileUnit.percent;
  }
  if (metric.evalType === MetricEvalType.binary) return TileUnit.percent;
  if (metric.evalType === MetricEvalType.continuous_qualitative) {
    return TileUnit.score;
  }
  if (metric.evalType === MetricEvalType.enum) return TileUnit.text;
  return TileUnit.value;
};

const numbersOf = (runs: TileRun[]) =>
  runs.flatMap((run) => {
    if (typeof run.value === 'number') return [run.value];
    return [];
  });

const percentOf = (runs: TileRun[], test: (run: TileRun) => boolean) => {
  if (runs.length === 0) return null;
  return (runs.filter(test).length / runs.length) * PERCENT;
};

const passedTest = (run: TileRun) => {
  if (run.passed !== null) return run.passed;
  return run.value === true;
};

const aggregateOf = (unit: TileUnit, runs: TileRun[]) => {
  if (unit === TileUnit.percent) return percentOf(runs, passedTest);
  if (unit === TileUnit.text) return null;
  const average = mean(numbersOf(runs));
  if (average === null) return null;
  return round2(average);
};

const modeText = (runs: TileRun[]) => {
  const counts = new Map<string, number>();
  for (const run of runs) {
    const key = String(run.value);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const [top] = [...counts.entries()].toSorted(
    (left, right) => right[1] - left[1],
  );
  return top?.[0] ?? null;
};

const textOf = (unit: TileUnit, runs: TileRun[]) => {
  if (unit !== TileUnit.text) return null;
  return modeText(runs);
};

export const buildMetricTile = (
  metric: DetailMetric,
  runs: ResultRunRecord[],
  verdicts: RunVerdicts,
): ResultMetricTile => {
  const evaluated = tileRuns(metric, runs, verdicts);
  const unit = unitOf(metric);
  const inRubric = metric.rubricRule !== null;
  return {
    metricId: metric.id,
    name: metric.name,
    description: metric.description,
    evalType: metric.evalType,
    functionName: metric.predefinedMetric?.functionName ?? null,
    unit,
    aggregate: aggregateOf(unit, evaluated),
    text: textOf(unit, evaluated),
    passed:
      inRubric &&
      evaluated.length > 0 &&
      evaluated.every((run) => run.passed === true),
    thresholdText: thresholdText(metric.rubricRule),
    inRubric,
    runs: evaluated,
  };
};

export const hasEvaluations = (metricId: number, runs: ResultRunRecord[]) =>
  runs.some((run) =>
    run.conversation.metricEvaluations.some(
      (evaluation) => evaluation.metricId === metricId,
    ),
  );
