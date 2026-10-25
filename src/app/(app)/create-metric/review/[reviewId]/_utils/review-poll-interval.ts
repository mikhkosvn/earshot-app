import type { PatternReviewView } from '@/server/metrics/types';

import {
  ACTIVE_REVIEW_STATUSES,
  REVIEW_POLL_INTERVAL_MS,
} from '../_constants/review-poll';

export const reviewPollInterval = (review: PatternReviewView | undefined) => {
  if (!review) return false;
  if (!ACTIVE_REVIEW_STATUSES.includes(review.status)) return false;
  return REVIEW_POLL_INTERVAL_MS;
};
