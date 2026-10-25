import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { updateRunFeedbackSchema } from '@/server/run-reviews/schemas';
import type { RunReviewState } from '@/server/run-reviews/types';

const feedbackValue = (feedback: string) => {
  if (feedback.length === 0) return null;
  return feedback;
};

export const updateRunFeedback = withValidation(
  updateRunFeedbackSchema,
  async ({ runId, feedback }): Promise<RunReviewState> => {
    const { user } = await requireUser();
    await prisma.run.findUniqueOrThrow({
      where: { id: runId, result: { project: projectAccessWhere(user.id) } },
      select: { id: true },
    });
    const run = await prisma.run.update({
      where: { id: runId },
      data: { feedback: feedbackValue(feedback) },
      select: { id: true, evaluationStatus: true, feedback: true },
    });
    return {
      runId: run.id,
      evaluationStatus: run.evaluationStatus,
      feedback: run.feedback,
    };
  },
);
