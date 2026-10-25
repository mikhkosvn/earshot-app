'use client';

import { useParams } from 'next/navigation';

export const useReviewId = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  return Number(reviewId);
};
