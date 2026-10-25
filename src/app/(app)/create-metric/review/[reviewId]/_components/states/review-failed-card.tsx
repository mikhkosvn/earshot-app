'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { ReviewDoneButton } from '../review-done-button';

export function ReviewFailedCard() {
  const review = usePatternReview();

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-background p-6">
      <p className="text-sm font-medium text-foreground">
        The review of {review.metric.name} failed.
      </p>
      <p className="text-sm whitespace-pre-wrap text-destructive">
        {review.error || 'The review stopped with an unknown error.'}
      </p>
      <div>
        <ReviewDoneButton />
      </div>
    </div>
  );
}
