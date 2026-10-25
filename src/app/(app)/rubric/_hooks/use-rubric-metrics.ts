'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useRubricQuery } from './use-rubric-query';

export const useRubricMetrics = () => {
  const { data } = useSuspenseQuery({
    ...useRubricQuery(),
    select: (rubric) => rubric.metrics,
  });
  return data;
};
