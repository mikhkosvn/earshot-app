'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { MetricReviewService } from '../_service';
import { useReviewId } from './use-review-id';

export const usePatternReview = () => {
  const reviewId = useReviewId();
  const { data } = useSuspenseQuery(
    MetricReviewService.getReviewQuery({ reviewId }),
  );
  return data;
};
