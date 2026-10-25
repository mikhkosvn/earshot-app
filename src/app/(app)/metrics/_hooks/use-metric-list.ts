'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useMetricListQuery } from './use-metric-list-query';

export const useMetricList = () => {
  const { data } = useSuspenseQuery(useMetricListQuery());
  return data;
};
