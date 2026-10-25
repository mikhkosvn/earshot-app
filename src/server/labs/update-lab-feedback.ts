import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updateLabFeedbackSchema } from '@/server/labs/schemas';
import { requireLabReviewAccess } from '@/server/labs/utils/require-lab-review-access';

export const updateLabFeedback = withValidation(
  updateLabFeedbackSchema,
  async ({ reviewId, feedback }) => {
    const { review } = await requireLabReviewAccess(reviewId);
    await prisma.labReview.update({
      where: { id: reviewId },
      data: { feedback: feedback || null },
    });
    return { reviewId, metricId: review.metricId };
  },
);
