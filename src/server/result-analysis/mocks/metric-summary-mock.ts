import 'server-only';

import { MAX_METRIC_SUMMARY_SENTENCES } from '@/server/result-analysis/constants';
import type {
  AnalysisMetricScore,
  AnalysisRun,
  MetricSummaryDraft,
} from '@/server/result-analysis/types';

const round = (value: number) => Math.round(value * 100) / 100;

const scoreSentence = (scores: AnalysisMetricScore[], total: number) => {
  const booleans = scores.filter((score) => typeof score.value === 'boolean');
  if (booleans.length > 0) {
    const passed = booleans.filter((score) => score.value === true).length;
    return `Passed on ${passed} of ${booleans.length} evaluated calls.`;
  }
  const numbers = scores.flatMap((score) => {
    if (typeof score.value !== 'number') return [];
    return [score.value];
  });
  if (numbers.length > 0) {
    const average =
      numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
    return `Average value ${round(average)} across ${numbers.length} of ${total} calls.`;
  }
  return `Scored on ${scores.length} of ${total} calls.`;
};

const commonExplanation = (scores: AnalysisMetricScore[]) => {
  const counts = new Map<string, number>();
  for (const score of scores) {
    const line = score.explanation[0]?.trim();
    if (line) counts.set(line, (counts.get(line) ?? 0) + 1);
  }
  const [best] = [...counts.entries()].toSorted(
    (left, right) => right[1] - left[1],
  );
  return best?.[0] ?? null;
};

const missingSentence = (scores: AnalysisMetricScore[]) => {
  const missing = scores.filter((score) => score.value === null).length;
  if (missing === 0) return null;
  return `No value on ${missing} call(s).`;
};

export const mockMetricSummaries = (
  runs: AnalysisRun[],
): MetricSummaryDraft[] => {
  const byMetric = new Map<number, AnalysisMetricScore[]>();
  for (const run of runs) {
    for (const score of run.metrics) {
      byMetric.set(score.metricId, [
        ...(byMetric.get(score.metricId) ?? []),
        score,
      ]);
    }
  }
  return [...byMetric.entries()].map(([metricId, scores]) => ({
    metricId,
    explanation: [
      scoreSentence(scores, runs.length),
      commonExplanation(scores),
      missingSentence(scores),
    ]
      .filter((line): line is string => Boolean(line))
      .slice(0, MAX_METRIC_SUMMARY_SENTENCES),
  }));
};
