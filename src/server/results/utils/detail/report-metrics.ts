import 'server-only';

import { mean, round2 } from '@/server/metric-scoring/utils/statistics';
import type { ResultReportMetric } from '@/server/results/types';
import type {
  DetailMetric,
  ResultDetailRecord,
} from '@/server/results/utils/detail/detail-record';

const scoreOf = (evaluation: {
  valueNumber: number | null;
  valueBoolean: boolean | null;
}) => {
  if (evaluation.valueNumber !== null) return evaluation.valueNumber;
  if (evaluation.valueBoolean !== null) return Number(evaluation.valueBoolean);
  return 0;
};

export const buildReportMetrics = (
  record: ResultDetailRecord,
  metrics: DetailMetric[],
): ResultReportMetric[] => {
  const summaries = new Map(
    record.metricSummaries.map((summary) => [
      summary.metricId,
      summary.explanation,
    ]),
  );
  return metrics.flatMap((metric) => {
    const evaluations = record.runs.flatMap((run) =>
      run.conversation.metricEvaluations.filter(
        (evaluation) => evaluation.metricId === metric.id,
      ),
    );
    if (evaluations.length === 0) return [];
    return [
      {
        metricId: metric.id,
        name: metric.name,
        score: round2(mean(evaluations.map(scoreOf)) ?? 0),
        explanation: summaries.get(metric.id) ?? [],
      },
    ];
  });
};
