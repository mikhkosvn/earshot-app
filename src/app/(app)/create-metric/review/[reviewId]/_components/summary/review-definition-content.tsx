'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';
import { ReviewDefinitionCode } from './review-definition-code';

export function ReviewDefinitionContent() {
  const review = usePatternReview();

  return (
    <div className="flex flex-col gap-2 rounded-md border bg-muted/30 p-3">
      <p className="text-sm whitespace-pre-wrap text-foreground">
        {review.metric.description}
      </p>
      <ReviewDefinitionCode />
    </div>
  );
}
