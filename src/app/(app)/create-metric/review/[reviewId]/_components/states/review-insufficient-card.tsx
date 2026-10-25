'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { ReviewDoneButton } from '../review-done-button';
import { ReviewOpenMetricButton } from './review-open-metric-button';

export function ReviewInsufficientCard() {
  const review = usePatternReview();

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          {review.metric.name} is ready.
        </p>
        <p className="text-sm text-muted-foreground">
          There are not enough recent calls or runs to review it against yet. It
          will start scoring new calls as they come in.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ReviewDoneButton />
        <ReviewOpenMetricButton />
      </div>
    </div>
  );
}
