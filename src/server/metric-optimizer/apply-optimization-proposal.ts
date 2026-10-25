import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  HistoryChangeType,
  OptimizationStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { AUTO_IMPROVE_CHANGE_REASON } from '@/server/metric-optimizer/constants/optimizer-text';
import { optimizationSessionSchema } from '@/server/metric-optimizer/schemas';
import { requireOpenSession } from '@/server/metric-optimizer/utils/require-session-access';
import {
  metricDetailSelect,
  toMetricDetail,
} from '@/server/metrics/utils/metric-view';
import { writeMetricVersion } from '@/server/metrics/utils/records/metric-version';

const proposalSelect = {
  type: true,
  description: true,
  customCode: true,
  evaluationTrigger: true,
  triggerType: true,
  evaluationTriggerPrompt: true,
  evaluationTriggerCustomCode: true,
  reviewResults: {
    select: {
      labReviewId: true,
      actualNumber: true,
      actualBoolean: true,
      actualText: true,
      explanation: true,
    },
  },
} satisfies Prisma.MetricOptimizationProposalSelect;

type ProposalRow = Prisma.MetricOptimizationProposalGetPayload<{
  select: typeof proposalSelect;
}>;

const loadProposal = async (sessionId: number) => {
  const proposal = await prisma.metricOptimizationProposal.findFirst({
    where: { sessionId },
    orderBy: { version: Prisma.SortOrder.desc },
    select: proposalSelect,
  });
  if (!proposal) throw new ActionError('This session has no proposal.');
  return proposal;
};

const assertEditable = async (metricId: number) => {
  const metric = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId },
    select: { predefinedMetric: { select: { editable: true } } },
  });
  if (metric.predefinedMetric && !metric.predefinedMetric.editable) {
    throw new ActionError('This predefined metric cannot be edited.');
  }
};

const applyProposal = async (
  tx: Prisma.TransactionClient,
  metricId: number,
  userId: number,
  proposal: ProposalRow,
) => {
  const versionCount = await tx.metricVersion.count({ where: { metricId } });
  if (versionCount === 0) {
    await writeMetricVersion(tx, {
      metricId,
      userId: null,
      changeType: HistoryChangeType.created,
    });
  }
  await tx.metric.update({
    where: { id: metricId },
    data: {
      type: proposal.type,
      description: proposal.description ?? '',
      customCode: proposal.customCode,
      evaluationTrigger: proposal.evaluationTrigger,
      triggerType: proposal.triggerType,
      evaluationTriggerPrompt: proposal.evaluationTriggerPrompt,
      evaluationTriggerCustomCode: proposal.evaluationTriggerCustomCode,
    },
  });
  await writeMetricVersion(tx, {
    metricId,
    userId,
    changeType: HistoryChangeType.updated,
    changeReason: AUTO_IMPROVE_CHANGE_REASON,
  });
  const evaluatedAt = new Date();
  for (const result of proposal.reviewResults) {
    await tx.labReview.update({
      where: { id: result.labReviewId },
      data: {
        actualNumber: result.actualNumber,
        actualBoolean: result.actualBoolean,
        actualText: result.actualText,
        actualExplanation: result.explanation,
        actualEvaluatedAt: evaluatedAt,
      },
    });
  }
};

export const applyOptimizationProposal = withValidation(
  optimizationSessionSchema,
  async ({ sessionId }) => {
    const { user, session } = await requireOpenSession(sessionId);
    await assertEditable(session.metricId);
    const proposal = await loadProposal(sessionId);
    await prisma.$transaction(async (tx) => {
      await applyProposal(tx, session.metricId, user.id, proposal);
      await tx.metricOptimizationSession.update({
        where: { id: sessionId },
        data: {
          status: OptimizationStatus.applied,
          appliedAt: new Date(),
          appliedById: user.id,
        },
      });
    });
    const row = await prisma.metric.findUniqueOrThrow({
      where: { id: session.metricId },
      select: metricDetailSelect,
    });
    return toMetricDetail(row);
  },
);
