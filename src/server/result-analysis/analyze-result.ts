import 'server-only';

import { AiSummaryStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import { AnalysisStep } from '@/server/result-analysis/constants/analysis-step';
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
  step: AnalysisStep,
  task: () => Promise<T>,
  fallback: () => T,
) => {
  try {
    return await task();
  } catch (error) {
    recordStepFailure(step, error);
    return fallback();
  }
};

const failureAnalysis = async (input: AnalysisInput) => {
  if (!input.runs.some((run) => run.failed)) {
    return { aiSummary: null, failureReasons: [], nextSteps: [] };
  }
  return {
    aiSummary: await withFallback(
      AnalysisStep.summary,
      () => generateAiSummary(input),
      () => mockAiSummary(input),
    ),
    failureReasons: await withFallback(
      AnalysisStep.failure_reasons,
      () => generateFailureReasons(input),
      () => mockFailureReasons(input.runs),
    ),
    nextSteps: await withFallback(
      AnalysisStep.next_steps,
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
  addEventFields({
    result: { id: resultId },
    analysis: {
      run_count: input.runs.length,
      failed_run_count: input.runs.filter((run) => run.failed).length,
    },
  });
  const analysis: ResultAnalysis = {
    ...(await failureAnalysis(input)),
    workflowPaths: await withFallback(
      AnalysisStep.workflow_coverage,
      () => generateWorkflowCoverage(input),
      () => mockWorkflowCoverage(input),
    ),
    metricSummaries: await withFallback(
      AnalysisStep.metric_summaries,
      () => generateMetricSummaries(input),
      () => mockMetricSummaries(input.runs),
    ),
  };
  await saveAnalysis(resultId, analysis);
  return analysis;
};
