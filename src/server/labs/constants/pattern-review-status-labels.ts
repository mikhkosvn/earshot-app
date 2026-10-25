import { PatternReviewStatus } from '@/generated/prisma/enums';

export const PatternReviewStatusLabel: Record<PatternReviewStatus, string> = {
  [PatternReviewStatus.pending]: 'Pending',
  [PatternReviewStatus.running]: 'Running',
  [PatternReviewStatus.ready]: 'Ready',
  [PatternReviewStatus.rebuilding]: 'Rebuilding',
  [PatternReviewStatus.completed]: 'Completed',
  [PatternReviewStatus.failed]: 'Failed',
};
