import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
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
    addEventFields({
      lab_review: { id: reviewId, has_feedback: Boolean(feedback) },
      metric: { id: review.metricId },
    });
    return { reviewId, metricId: review.metricId };
  },
);
