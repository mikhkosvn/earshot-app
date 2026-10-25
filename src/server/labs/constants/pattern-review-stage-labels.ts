import { PatternReviewStage } from '@/generated/prisma/enums';

export const PatternReviewStageLabel: Record<PatternReviewStage, string> = {
  [PatternReviewStage.sampling]: 'Sampling',
  [PatternReviewStage.grouping]: 'Grouping',
  [PatternReviewStage.reading_fixes]: 'Reading fixes',
  [PatternReviewStage.optimizing]: 'Optimizing',
};
