'use client';

import { usePatternReview } from './use-pattern-review';

export const usePatternGroup = (groupKey: string) => {
  const review = usePatternReview();
  const group = review.groups.find((item) => item.key === groupKey);
  if (!group) throw new Error('The pattern group does not exist.');
  return group;
};
