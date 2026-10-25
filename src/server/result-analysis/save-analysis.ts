import 'server-only';

import { AiSummaryStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { ResultAnalysis } from '@/server/result-analysis/types';

const summaryData = (analysis: ResultAnalysis, now: Date) => {
  if (!analysis.aiSummary) {
    return {
      aiSummaryStatus: AiSummaryStatus.skipped_no_failures,
      aiSummaryWhatHappened: null,
      aiSummaryWhyItHappened: null,
      aiSummaryHowToFix: null,
      aiSummaryGeneratedAt: null,
    };
  }
  return {
    aiSummaryStatus: AiSummaryStatus.completed,
    aiSummaryWhatHappened: analysis.aiSummary.whatHappened,
    aiSummaryWhyItHappened: analysis.aiSummary.whyItHappened,
    aiSummaryHowToFix: analysis.aiSummary.howToFix,
    aiSummaryGeneratedAt: now,
  };
};

export const saveAnalysis = async (
  resultId: number,
  analysis: ResultAnalysis,
) => {
  const now = new Date();
  await prisma.$transaction(async (tx) => {
    await tx.resultNextStep.deleteMany({ where: { resultId } });
    await tx.resultWorkflowPath.deleteMany({ where: { resultId } });
    await tx.resultFailureReason.deleteMany({ where: { resultId } });
    await tx.resultMetricSummary.deleteMany({ where: { resultId } });
    await tx.resultNextStep.createMany({
      data: analysis.nextSteps.map((step, position) => ({
        resultId,
        position,
        title: step.title,
        description: step.description,
      })),
    });
    await tx.resultWorkflowPath.createMany({
      data: analysis.workflowPaths.map((path, position) => ({
        resultId,
        position,
        label: path.label,
        covered: path.covered,
      })),
    });
    for (const [index, reason] of analysis.failureReasons.entries()) {
      await tx.resultFailureReason.create({
        data: {
          resultId,
          rank: index + 1,
          description: reason.description,
          runs: {
            create: reason.runIds.map((runId) => ({ runId })),
          },
        },
      });
    }
    await tx.resultMetricSummary.createMany({
      data: analysis.metricSummaries.map((summary) => ({
        resultId,
        metricId: summary.metricId,
        explanation: summary.explanation,
      })),
    });
    await tx.result.update({
      where: { id: resultId },
      data: {
        ...summaryData(analysis, now),
        pathCoverageGeneratedAt: now,
      },
    });
  });
};
