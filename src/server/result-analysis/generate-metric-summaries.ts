import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  ANALYSIS_MAX_TOKENS,
  ANALYST_SYSTEM_PROMPT,
  MAX_METRIC_SUMMARY_SENTENCES,
} from '@/server/result-analysis/constants';
import { mockMetricSummaries } from '@/server/result-analysis/mocks/metric-summary-mock';
import { metricSummariesSchema } from '@/server/result-analysis/schemas';
import type {
  AnalysisInput,
  MetricSummaryDraft,
} from '@/server/result-analysis/types';

const formatScores = (input: AnalysisInput) => {
  const lines = new Map<number, string[]>();
  for (const run of input.runs) {
    for (const score of run.metrics) {
      const line = `run ${run.id}: value ${JSON.stringify(score.value)}; ${score.explanation.slice(0, 2).join(' ')}`;
      lines.set(score.metricId, [
        ...(lines.get(score.metricId) ?? [
          `Metric ${score.metricId} "${score.name}" (${score.evalType}):`,
        ]),
        line,
      ]);
    }
  }
  return [...lines.values()].map((group) => group.join('\n')).join('\n\n');
};

export const generateMetricSummaries = async (
  input: AnalysisInput,
): Promise<MetricSummaryDraft[]> => {
  const metricIds = new Set(
    input.runs.flatMap((run) => run.metrics.map((score) => score.metricId)),
  );
  if (metricIds.size === 0) return [];
  const output = await generateObject({
    system: ANALYST_SYSTEM_PROMPT,
    prompt: [
      `For each metric below, write up to ${MAX_METRIC_SUMMARY_SENTENCES} sentences of analysis across all calls of the result.`,
      'Return one item for each metric ID.',
      formatScores(input),
    ].join('\n\n'),
    schema: metricSummariesSchema,
    maxTokens: ANALYSIS_MAX_TOKENS,
    mock: () => ({ metrics: mockMetricSummaries(input.runs) }),
  });
  return output.metrics
    .filter((item) => metricIds.has(item.metricId))
    .map((item) => ({
      metricId: item.metricId,
      explanation: item.explanation.map((line) => line.trim()).filter(Boolean),
    }));
};
