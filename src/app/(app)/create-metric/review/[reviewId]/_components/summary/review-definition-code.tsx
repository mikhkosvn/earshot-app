'use client';

import { usePatternReview } from '../../_hooks/use-pattern-review';

export function ReviewDefinitionCode() {
  const review = usePatternReview();

  if (!review.metric.customCode) return null;

  return (
    <pre className="max-h-80 overflow-auto rounded-md bg-background p-3 font-mono text-xs">
      {review.metric.customCode}
    </pre>
  );
}
