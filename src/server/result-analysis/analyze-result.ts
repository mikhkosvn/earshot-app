import 'server-only';

import { AiSummaryStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateAiSummary } from '@/server/result-analysis/generate-ai-summary';
import { generateFailureReasons } from '@/server/result-analysis/generate-failure-reasons';
import { generateMetricSummaries } from '@/server/result-analysis/generate-metric-summaries';
import { generateNextSteps } from '@/server/result-analysis/generate-next-steps';
import { generateWorkflowCoverage } from '@/server/result-analysis/generate-workflow-coverage';
import { loadAnalysisInput } from '@/server/result-analysis/load-analysis-input';
import { mockAiSummary } from '@/server/result-analysis/mocks/summary-mock';
import {
  mockFailureReasons,
  mockNextSteps,
} from '@/server/result-analysis/mocks/failure-steps-mock';
import { mockMetricSummaries } from '@/server/result-analysis/mocks/metric-summary-mock';
import { mockWorkflowCoverage } from '@/server/result-analysis/mocks/workflow-mock';
import { saveAnalysis } from '@/server/result-analysis/save-analysis';
import type {
  AnalysisInput,
  ResultAnalysis,
} from '@/server/result-analysis/types';

const withFallback = async <T>(
  label: string,
  task: () => Promise<T>,
  fallback: () => T,
) => {
  try {
    return await task();
  } catch (error) {
    console.error(`[result-analysis] The ${label} step failed.`, error);
    return fallback();
  }
};

const failureAnalysis = async (input: AnalysisInput) => {
  if (!input.runs.some((run) => run.failed)) {
    return { aiSummary: null, failureReasons: [], nextSteps: [] };
  }
  return {
    aiSummary: await withFallback(
      'summary',
      () => generateAiSummary(input),
      () => mockAiSummary(input),
    ),
    failureReasons: await withFallback(
      'failure reasons',
      () => generateFailureReasons(input),
      () => mockFailureReasons(input.runs),
    ),
    nextSteps: await withFallback(
      'next steps',
      () => generateNextSteps(input),
      () => mockNextSteps(input.runs),
    ),
  };
};

export const analyzeResult = async (resultId: number) => {
  await prisma.result.update({
    where: { id: resultId },
    data: { aiSummaryStatus: AiSummaryStatus.pending },
  });
  const input = await loadAnalysisInput(resultId);
  const analysis: ResultAnalysis = {
    ...(await failureAnalysis(input)),
    workflowPaths: await withFallback(
      'workflow coverage',
      () => generateWorkflowCoverage(input),
      () => mockWorkflowCoverage(input),
    ),
    metricSummaries: await withFallback(
      'metric summaries',
      () => generateMetricSummaries(input),
      () => mockMetricSummaries(input.runs),
    ),
  };
  await saveAnalysis(resultId, analysis);
  return analysis;
};
