'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { reviewFooterText } from '../../_utils/review-text';
import { ReviewDoneButton } from '../review-done-button';
import { ReviewCompletedLine } from './review-completed-line';
import { ReviewRebuildButton } from './review-rebuild-button';

export function ReviewFooterCard() {
  const review = usePatternReview();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-background p-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          {reviewFooterText(review.groups)}
        </p>
        <ReviewCompletedLine />
      </div>
      <div className="flex items-center gap-2">
        <ReviewDoneButton variant="outline" />
        <ReviewRebuildButton />
      </div>
    </div>
  );
}
