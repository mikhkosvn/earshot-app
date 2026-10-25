'use client';

import { ReviewViewState } from '../_constants/review-view-state';
import { usePatternReview } from '../_hooks/use-pattern-review';
import { reviewViewStateOf } from '../_utils/review-view-state';
import { ReviewFooterCard } from './footer/review-footer-card';
import { PatternGroupList } from './group/pattern-group-list';
import { ReviewFailedCard } from './states/review-failed-card';
import { ReviewInsufficientCard } from './states/review-insufficient-card';
import { ReviewProgressCard } from './states/review-progress-card';
import { ReviewSummaryCard } from './summary/review-summary-card';

export function MetricReviewStateView() {
  const review = usePatternReview();
  const state = reviewViewStateOf(review);

  if (state === ReviewViewState.progress) return <ReviewProgressCard />;
  if (state === ReviewViewState.failed) return <ReviewFailedCard />;
  if (state === ReviewViewState.insufficient) {
    return <ReviewInsufficientCard />;
  }

  return (
    <div className="flex flex-col gap-4">
      <ReviewSummaryCard />
      <PatternGroupList />
      <ReviewFooterCard />
    </div>
  );
}
