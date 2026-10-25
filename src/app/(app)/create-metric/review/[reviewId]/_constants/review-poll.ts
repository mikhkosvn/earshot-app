import { PatternReviewStatus } from '@/generated/prisma/enums';

export const REVIEW_POLL_INTERVAL_MS = 1500;

export const ACTIVE_REVIEW_STATUSES: PatternReviewStatus[] = [
  PatternReviewStatus.pending,
  PatternReviewStatus.running,
  PatternReviewStatus.rebuilding,
];
