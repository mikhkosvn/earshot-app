import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { updateRunEvaluationSchema } from '@/server/run-reviews/schemas';
import type { RunReviewState } from '@/server/run-reviews/types';

const reviewSelect = { id: true, evaluationStatus: true, feedback: true };

export const updateRunEvaluation = withValidation(
  updateRunEvaluationSchema,
  async ({ runId, evaluationStatus }): Promise<RunReviewState> => {
    const { user } = await requireUser();
    await prisma.run.findUniqueOrThrow({
      where: { id: runId, result: { project: projectAccessWhere(user.id) } },
      select: { id: true },
    });
    const run = await prisma.run.update({
      where: { id: runId },
      data: { evaluationStatus },
      select: reviewSelect,
    });
    return {
      runId: run.id,
      evaluationStatus: run.evaluationStatus,
      feedback: run.feedback,
    };
  },
);
