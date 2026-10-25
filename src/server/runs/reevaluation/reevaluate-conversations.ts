import 'server-only';

import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import { scoreConversation } from '@/server/metric-scoring/score-conversation';
import {
  computeEvaluationStatus,
  scoreRun,
} from '@/server/runs/execution/score-run';
import { keepReviewedStatus } from '@/server/runs/reevaluation/apply-evaluation-status';
import { reevaluateConversationsSchema } from '@/server/runs/schemas';
import type { StartedReevaluation } from '@/server/runs/types';
import { conversationAccessWhere } from '@/server/runs/utils/result-access-where';

const MIXED_PROJECTS_MESSAGE = 'Select conversations of one project at a time.';

type ConversationsInput = {
  conversationIds: number[];
  metricIds: number[] | null;
};

const rescoreConversation = async (
  projectId: number,
  conversationId: number,
  metricIds: number[] | undefined,
) => {
  const conversation = await prisma.conversation.findUniqueOrThrow({
    where: { id: conversationId },
    select: {
      run: {
        select: {
          id: true,
          evaluatorId: true,
          evaluatorSnapshot: true,
          evaluationStatus: true,
        },
      },
      callLog: { select: { id: true, evaluationStatus: true } },
    },
  });
  const { run, callLog } = conversation;
  if (run) {
    const computed = await scoreRun({
      projectId,
      conversationId,
      evaluatorId: run.evaluatorId,
      evaluatorSnapshot: run.evaluatorSnapshot,
      metricIds,
    });
    await prisma.run.update({
      where: { id: run.id },
      data: {
        evaluationStatus: keepReviewedStatus(run.evaluationStatus, computed),
      },
    });
    return;
  }
  await scoreConversation({ projectId, conversationId, metricIds });
  if (!callLog) return;
  const computed = await computeEvaluationStatus(conversationId);
  await prisma.callLog.update({
    where: { id: callLog.id },
    data: {
      evaluationStatus: keepReviewedStatus(callLog.evaluationStatus, computed),
    },
  });
};

export const reevaluateConversations = withValidation(
  reevaluateConversationsSchema,
  async ({ conversationIds, metricIds }): Promise<StartedReevaluation> => {
    const { user } = await requireUser();
    const unique = [...new Set(conversationIds)];
    const rows = await prisma.conversation.findMany({
      where: { id: { in: unique }, ...conversationAccessWhere(user.id) },
      select: { id: true, projectId: true },
    });
    if (rows.length !== unique.length) {
      throw new ActionError('A selected conversation does not exist.', 404);
    }
    const projectIds = [...new Set(rows.map((row) => row.projectId))];
    if (projectIds.length !== 1) throw new ActionError(MIXED_PROJECTS_MESSAGE);
    const [projectId] = projectIds;
    const input: ConversationsInput = {
      conversationIds: unique,
      metricIds: metricIds ?? null,
    };
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.reevaluation,
      input,
      initialStep: 'Reevaluating metrics',
      run: async (context) => {
        for (const [index, conversationId] of unique.entries()) {
          await context.setStep(
            `Reevaluating conversation ${index + 1} of ${unique.length}`,
          );
          await rescoreConversation(
            projectId,
            conversationId,
            input.metricIds ?? undefined,
          );
        }
        await context.setResult({
          summary: `Reevaluated ${unique.length} conversation(s).`,
        });
      },
    });
  },
);
