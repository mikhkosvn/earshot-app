import 'server-only';

import {
  MetricEvalType,
  type WidgetTimePeriod,
} from '@/generated/prisma/enums';
import { MetricFunction } from '@/server/dashboards/constants/metric-function';
import { roundValue } from '@/server/dashboards/utils/plot-data/aggregate';
import { bucketLabel } from '@/server/dashboards/utils/time/time-labels';
import {
  bucketStart,
  listBucketStarts,
} from '@/server/dashboards/utils/time/zoned-time';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import { isPassedEvaluation } from '@/server/results/utils/result-row';
import {
  MAX_OVERVIEW_BUCKETS,
  MAX_TOP_FAILED_SCENARIOS,
} from '@/server/runs-overview/constants';
import type {
  FailedScenario,
  MetricOverTime,
  OverviewPoint,
  OverviewStat,
  RunsOverview,
  SuccessRatePoint,
} from '@/server/runs-overview/types';

import type { OverviewEvaluation, OverviewRun } from './load-overview-runs';

const MAX_BUCKET_SCAN = 20_000;

type BucketContext = {
  period: WidgetTimePeriod;
  timeZone: string;
};

const average = (values: number[]) => {
  if (values.length === 0) return 0;
  return values.reduce((total, value) => total + value, 0) / values.length;
};

const successRateOfRuns = (runs: OverviewRun[]) => {
  if (runs.length === 0) return 0;
  const passed = runs.filter((run) => isPassedEvaluation(run.evaluationStatus));
  return (passed.length / runs.length) * 100;
};

const functionValues = (runs: OverviewRun[], functionName: string) =>
  runs.flatMap((run) =>
    run.evaluations.flatMap((evaluation) => {
      if (evaluation.functionName !== functionName) return [];
      if (evaluation.number === null) return [];
      return [evaluation.number];
    }),
  );

const changeOf = (value: number, previous: number) => {
  if (previous === 0) return 0;
  return roundValue(((value - previous) / previous) * 100);
};

const statOf = (value: number, previous: number): OverviewStat => ({
  value: roundValue(value),
  previous: roundValue(previous),
  change: changeOf(value, previous),
});

export const overviewStats = (
  current: OverviewRun[],
  previous: OverviewRun[],
): Pick<
  RunsOverview,
  'successRate' | 'totalCalls' | 'avgTalkRatio' | 'avgLatency'
> => ({
  successRate: statOf(successRateOfRuns(current), successRateOfRuns(previous)),
  totalCalls: statOf(current.length, previous.length),
  avgTalkRatio: statOf(
    average(functionValues(current, MetricFunction.talkRatio)),
    average(functionValues(previous, MetricFunction.talkRatio)),
  ),
  avgLatency: statOf(
    average(functionValues(current, MetricFunction.latency)),
    average(functionValues(previous, MetricFunction.latency)),
  ),
});

const groupByBucket = <T>(
  items: { date: Date; item: T }[],
  context: BucketContext,
) => {
  const buckets = new Map<number, T[]>();
  for (const { date, item } of items) {
    const start = bucketStart(date, context.period, context.timeZone).getTime();
    buckets.set(start, [...(buckets.get(start) ?? []), item]);
  }
  return buckets;
};

const pointKey = (start: number, context: BucketContext) => ({
  key: new Date(start).toISOString(),
  label: bucketLabel(new Date(start), context.period, context.timeZone),
});

export const successRateSummary = (
  runs: OverviewRun[],
  range: { from: Date; to: Date },
  context: BucketContext,
): SuccessRatePoint[] => {
  const buckets = groupByBucket(
    runs.map((run) => ({ date: run.createdAt, item: run })),
    context,
  );
  return listBucketStarts(
    range.from,
    range.to,
    context.period,
    context.timeZone,
    MAX_BUCKET_SCAN,
  )
    .slice(-MAX_OVERVIEW_BUCKETS)
    .map((start) => {
      const bucketRuns = buckets.get(start.getTime()) ?? [];
      const successfulCalls = bucketRuns.filter((run) =>
        isPassedEvaluation(run.evaluationStatus),
      ).length;
      return {
        ...pointKey(start.getTime(), context),
        totalCalls: bucketRuns.length,
        successfulCalls,
        successRate: roundValue(successRateOfRuns(bucketRuns)),
      };
    });
};

const averagePoints = (
  items: { date: Date; item: number }[],
  context: BucketContext,
): OverviewPoint[] =>
  [...groupByBucket(items, context).entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([start, values]) => ({
      ...pointKey(start, context),
      value: roundValue(average(values)),
    }));

export const latencySummary = (
  runs: OverviewRun[],
  context: BucketContext,
): OverviewPoint[] =>
  averagePoints(
    runs.flatMap((run) =>
      functionValues([run], MetricFunction.latency).map((value) => ({
        date: run.createdAt,
        item: value,
      })),
    ),
    context,
  );

const isPercentMetric = (evalType: MetricEvalType) =>
  evalType === MetricEvalType.binary ||
  evalType === MetricEvalType.continuous_qualitative;

const chartValue = (evaluation: OverviewEvaluation) => {
  if (evaluation.evalType === MetricEvalType.binary) {
    if (evaluation.boolean === null) return null;
    return Number(evaluation.boolean) * 100;
  }
  if (evaluation.number === null) return null;
  if (evaluation.evalType === MetricEvalType.continuous_qualitative) {
    return (evaluation.number / RATING_SCALE_MAX) * 100;
  }
  return evaluation.number;
};

const aggregationLabelOf = (evalType: MetricEvalType) => {
  if (isPercentMetric(evalType)) return 'Percentage';
  return 'Avg';
};

export const metricSummary = (
  runs: OverviewRun[],
  context: BucketContext,
): MetricOverTime[] => {
  const byMetric = new Map<
    number,
    { evaluation: OverviewEvaluation; items: { date: Date; item: number }[] }
  >();
  for (const run of runs) {
    for (const evaluation of run.evaluations) {
      if (evaluation.evalType === MetricEvalType.enum) continue;
      const value = chartValue(evaluation);
      if (value === null) continue;
      const entry = byMetric.get(evaluation.metricId) ?? {
        evaluation,
        items: [],
      };
      entry.items.push({ date: run.createdAt, item: value });
      byMetric.set(evaluation.metricId, entry);
    }
  }
  return [...byMetric.values()]
    .sort((a, b) =>
      a.evaluation.metricName.localeCompare(b.evaluation.metricName),
    )
    .map(({ evaluation, items }) => ({
      metricId: evaluation.metricId,
      name: evaluation.metricName,
      percent: isPercentMetric(evaluation.evalType),
      aggregationLabel: aggregationLabelOf(evaluation.evalType),
      points: averagePoints(items, context),
    }));
};

export const topScenariosFailed = (runs: OverviewRun[]): FailedScenario[] => {
  const byName = new Map<string, FailedScenario>();
  for (const run of runs) {
    const entry = byName.get(run.scenarioName) ?? {
      name: run.scenarioName,
      failedCount: 0,
      totalCount: 0,
    };
    entry.totalCount += 1;
    if (!isPassedEvaluation(run.evaluationStatus)) entry.failedCount += 1;
    byName.set(run.scenarioName, entry);
  }
  return [...byName.values()]
    .filter((entry) => entry.failedCount > 0)
    .sort((a, b) => b.failedCount - a.failedCount)
    .slice(0, MAX_TOP_FAILED_SCENARIOS);
};
