'use client';

import { Button } from '@/components/ui/button';

import { useRebuildPatternReviewMutation } from '../../_hooks/mutations/use-rebuild-pattern-review-mutation';
import { usePatternReview } from '../../_hooks/use-pattern-review';
import { useReviewId } from '../../_hooks/use-review-id';
import { ReviewRebuildLabel } from './review-rebuild-label';

export function ReviewRebuildButton() {
  const reviewId = useReviewId();
  const review = usePatternReview();
  const rebuild = useRebuildPatternReviewMutation();
  const hasCorrection = review.groups.some(
    (group) => group.correction !== null,
  );

  return (
    <Button
      type="button"
      disabled={!hasCorrection || rebuild.isPending}
      onClick={() => rebuild.mutate({ reviewId })}
    >
      <ReviewRebuildLabel isPending={rebuild.isPending} />
    </Button>
  );
}
