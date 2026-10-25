import 'server-only';

import { RunStatus } from '@/generated/prisma/enums';
import {
  mean,
  percentile,
  round2,
} from '@/server/metric-scoring/utils/statistics';
import type { ResultDetail } from '@/server/results/types';
import type {
  DetailMetric,
  ResultRunRecord,
} from '@/server/results/utils/detail/detail-record';
import { PredefinedFunction } from '@/server/metrics/constants/scoring/predefined-function';
import { isTerminalRunStatus } from '@/server/runs/constants/run-status-groups';

const NOT_CONNECTED_STATUSES: RunStatus[] = [
  RunStatus.failed,
  RunStatus.timeout,
];

const isNotConnected = (run: ResultRunRecord) => {
  if (NOT_CONNECTED_STATUSES.includes(run.status)) return true;
  return isTerminalRunStatus(run.status) && run.conversation._count.turns === 0;
};

const graphLatencies = (extra: unknown) => {
  if (!extra || typeof extra !== 'object' || !('graph_data' in extra)) {
    return [];
  }
  const graph = extra.graph_data;
  if (!Array.isArray(graph)) return [];
  return graph.flatMap((point: unknown) => {
    if (!point || typeof point !== 'object' || !('latency' in point)) {
      return [];
    }
    const latency = point.latency;
    if (typeof latency === 'number') return [latency];
    return [];
  });
};

const latencyStats = (
  runs: ResultRunRecord[],
  metrics: DetailMetric[],
): ResultDetail['callStats']['latency'] => {
  const latencyMetric = metrics.find(
    (metric) =>
      metric.predefinedMetric?.functionName === PredefinedFunction.get_latency,
  );
  if (!latencyMetric) return null;
  const values = runs.flatMap((run) =>
    run.conversation.metricEvaluations
      .filter((evaluation) => evaluation.metricId === latencyMetric.id)
      .flatMap((evaluation) => graphLatencies(evaluation.extra)),
  );
  const average = mean(values);
  if (average === null) return null;
  return {
    p50: round2(percentile(values, 50) ?? 0),
    p95: round2(percentile(values, 95) ?? 0),
    p99: round2(percentile(values, 99) ?? 0),
    mean: round2(average),
  };
};

const ringingStats = (
  runs: ResultRunRecord[],
): ResultDetail['callStats']['ringing'] => {
  const values = runs.flatMap((run) => {
    const value = run.conversation.ringingDurationSeconds;
    if (value === null) return [];
    return [value];
  });
  const average = mean(values);
  if (average === null) return null;
  return { p50: round2(percentile(values, 50) ?? 0), mean: round2(average) };
};

export const buildCallStats = (
  runs: ResultRunRecord[],
  metrics: DetailMetric[],
): ResultDetail['callStats'] => ({
  failedToConnect: runs.filter(isNotConnected).length,
  latency: latencyStats(runs, metrics),
  ringing: ringingStats(runs),
});
