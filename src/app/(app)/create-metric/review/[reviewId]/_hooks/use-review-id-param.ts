'use client';

import { useParams } from 'next/navigation';

export const useReviewIdParam = () => {
  const { reviewId } = useParams<{ reviewId?: string }>();
  const id = Number(reviewId);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
};
