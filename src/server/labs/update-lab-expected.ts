import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updateLabExpectedSchema } from '@/server/labs/schemas';
import { requireLabReviewAccess } from '@/server/labs/utils/require-lab-review-access';
import { valueParts } from '@/server/metric-scoring/utils/value-parts';

export const updateLabExpected = withValidation(
  updateLabExpectedSchema,
  async ({ reviewId, expectedValue }) => {
    const { review } = await requireLabReviewAccess(reviewId);
    const parts = valueParts(expectedValue);
    await prisma.labReview.update({
      where: { id: reviewId },
      data: {
        expectedNumber: parts.number,
        expectedBoolean: parts.boolean,
        expectedText: parts.text,
      },
    });
    return { reviewId, metricId: review.metricId };
  },
);
