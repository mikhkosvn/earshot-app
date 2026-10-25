import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import {
  patternReviewSelect,
  toPatternReviewView,
} from '@/server/metrics/pattern-reviews/utils/pattern-review-view';
import { requireReviewAccess } from '@/server/metrics/pattern-reviews/utils/require-review-access';
import { reviewIdSchema } from '@/server/metrics/schemas';

export const getPatternReview = withValidation(
  reviewIdSchema,
  async ({ reviewId }) => {
    await requireReviewAccess(reviewId);
    const row = await prisma.metricPatternReview.findUniqueOrThrow({
      where: { id: reviewId },
      select: patternReviewSelect,
    });
    addEventFields({ pattern_review: { id: reviewId, status: row.status } });
    return toPatternReviewView(row);
  },
);
