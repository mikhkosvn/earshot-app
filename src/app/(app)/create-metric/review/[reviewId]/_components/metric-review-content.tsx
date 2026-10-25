'use client';

import { useReviewIdParam } from '../_hooks/use-review-id-param';
import { MetricReviewStateView } from './metric-review-state-view';

export function MetricReviewContent() {
  const reviewId = useReviewIdParam();
  if (reviewId === null) return null;

  return <MetricReviewStateView />;
}
