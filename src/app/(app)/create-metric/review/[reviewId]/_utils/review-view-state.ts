import { PatternReviewStatus } from '@/generated/prisma/enums';
import type { PatternReviewView } from '@/server/metrics/types';

import { ACTIVE_REVIEW_STATUSES } from '../_constants/review-poll';
import { ReviewViewState } from '../_constants/review-view-state';

export const reviewViewStateOf = (
  review: PatternReviewView,
): ReviewViewState => {
  if (ACTIVE_REVIEW_STATUSES.includes(review.status)) {
    return ReviewViewState.progress;
  }
  if (review.status === PatternReviewStatus.failed) {
    return ReviewViewState.failed;
  }
  if (review.insufficientHistory || review.groups.length === 0) {
    return ReviewViewState.insufficient;
  }
  return ReviewViewState.groups;
};
