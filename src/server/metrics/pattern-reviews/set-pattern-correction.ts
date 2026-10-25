import 'server-only';

import { PatternReviewStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { valueParts } from '@/server/metric-scoring/utils/value-parts';
import {
  patternReviewSelect,
  toPatternReviewView,
} from '@/server/metrics/pattern-reviews/utils/pattern-review-view';
import { requireReviewAccess } from '@/server/metrics/pattern-reviews/utils/require-review-access';
import { setPatternCorrectionSchema } from '@/server/metrics/schemas';
import type { SetPatternCorrectionInput } from '@/server/metrics/types';

const EDITABLE_STATUSES: PatternReviewStatus[] = [
  PatternReviewStatus.ready,
  PatternReviewStatus.completed,
];

const correctionData = (
  correction: SetPatternCorrectionInput['correction'],
) => {
  if (!correction) {
    return {
      correctionNumber: null,
      correctionBoolean: null,
      correctionText: null,
      correctionNote: null,
      correctedAt: null,
    };
  }
  const parts = valueParts(correction.value);
  return {
    correctionNumber: parts.number,
    correctionBoolean: parts.boolean,
    correctionText: parts.text,
    correctionNote: correction.note,
    correctedAt: new Date(),
  };
};

export const setPatternCorrection = withValidation(
  setPatternCorrectionSchema,
  async ({ reviewId, groupKey, correction }) => {
    const { review } = await requireReviewAccess(reviewId);
    if (!EDITABLE_STATUSES.includes(review.status)) {
      throw new ActionError('Wait until the review is ready.');
    }
    await prisma.patternReviewGroup.update({
      where: { reviewId_key: { reviewId, key: groupKey } },
      data: correctionData(correction),
    });
    const row = await prisma.metricPatternReview.findUniqueOrThrow({
      where: { id: reviewId },
      select: patternReviewSelect,
    });
    return toPatternReviewView(row);
  },
);
