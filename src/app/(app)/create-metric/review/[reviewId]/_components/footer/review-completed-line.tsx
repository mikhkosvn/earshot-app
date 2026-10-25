'use client';

import { PatternReviewStatus } from '@/generated/prisma/enums';

import { usePatternReview } from '../../_hooks/use-pattern-review';

export function ReviewCompletedLine() {
  const review = usePatternReview();

  if (review.status !== PatternReviewStatus.completed) return null;

  return (
    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
      Metric review completed.
    </p>
  );
}
