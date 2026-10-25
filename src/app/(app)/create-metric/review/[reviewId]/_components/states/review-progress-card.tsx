'use client';

import { Spinner } from '@/components/ui/spinner';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { reviewProgressText } from '../../_utils/review-text';

export function ReviewProgressCard() {
  const review = usePatternReview();

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background p-6">
      <Spinner className="size-5 text-muted-foreground" />
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-foreground">
          Reviewing {review.metric.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {reviewProgressText(review)}
        </p>
      </div>
    </div>
  );
}
