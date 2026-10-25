import 'server-only';

import type { DashboardSource } from '@/generated/prisma/enums';
import { formatCallDuration } from '@/server/call-logs/utils/payload/format-call-duration';
import { StatLabel } from '@/server/dashboards/constants/labels/widget-field-display-labels';
import { MetricFunction } from '@/server/dashboards/constants/metric-function';
import type { StatCell } from '@/server/dashboards/types';
import { metricIdsByFunction } from '@/server/dashboards/utils/project-metrics';
import { loadMetricValues } from '@/server/dashboards/utils/records/load-metric-values';
import type { PlotRecord } from '@/server/dashboards/utils/records/load-plot-records';

import { median, roundValue } from './aggregate';

export interface StatFacts {
  count: number;
  successRatio: number | null;
  totalSeconds: number;
  medianLatency: number | null;
}

const successRatioOf = (records: PlotRecord[]) => {
  const evaluated = records.filter((record) => record.success !== null);
  if (evaluated.length === 0) return null;
  const passed = evaluated.filter((record) => record.success === true);
  return (passed.length / evaluated.length) * 100;
};

export const statFactsOf = async (
  projectId: number,
  records: PlotRecord[],
): Promise<StatFacts> => {
  const latencyMetricId = (await metricIdsByFunction(projectId)).get(
    MetricFunction.latency,
  );
  const latencies = await loadMetricValues(
    latencyMetricId ?? 0,
    records.map((record) => record.conversationId),
  );
  const latencyValues = [...latencies.values()].flatMap((value) => {
    if (value.number === null) return [];
    return [value.number];
  });
  return {
    count: records.length,
    successRatio: successRatioOf(records),
    totalSeconds: records.reduce(
      (total, record) => total + (record.durationSeconds ?? 0),
      0,
    ),
    medianLatency: median(latencyValues),
  };
};

export const percentChange = (current: number, previous: number) => {
  if (previous === 0) return null;
  return roundValue(((current - previous) / previous) * 100);
};

const changeOf = (
  current: number | null,
  previous: number | null,
  previousCount: number,
) => {
  if (previousCount === 0 || current === null || previous === null) {
    return null;
  }
  return percentChange(current, previous);
};

const ratioText = (ratio: number | null) => {
  if (ratio === null) return '0%';
  return `${ratio.toFixed(1)}%`;
};

export const statCells = (
  source: DashboardSource,
  current: StatFacts,
  previous: StatFacts,
): StatCell[] => {
  const [ratioLabel, countLabel, minutesLabel, latencyLabel] =
    StatLabel[source];
  const previousCount = previous.count;
  return [
    {
      label: ratioLabel,
      value: ratioText(current.successRatio),
      unit: null,
      change: changeOf(
        current.successRatio,
        previous.successRatio,
        previousCount,
      ),
    },
    {
      label: countLabel,
      value: String(current.count),
      unit: null,
      change: changeOf(current.count, previous.count, previousCount),
    },
    {
      label: minutesLabel,
      value: formatCallDuration(current.totalSeconds),
      unit: null,
      change: changeOf(
        current.totalSeconds,
        previous.totalSeconds,
        previousCount,
      ),
    },
    {
      label: latencyLabel,
      value: String(Math.round(current.medianLatency ?? 0)),
      unit: 'ms',
      change: changeOf(
        current.medianLatency,
        previous.medianLatency,
        previousCount,
      ),
    },
  ];
};
