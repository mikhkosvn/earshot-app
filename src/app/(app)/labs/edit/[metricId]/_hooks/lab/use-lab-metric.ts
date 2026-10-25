'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EditMetricService } from '@/app/(app)/metrics/edit/[metricId]/_service';

import { useLabMetricId } from './use-lab-metric-id';

export const useLabMetric = () => {
  const metricId = useLabMetricId();
  const { data } = useSuspenseQuery(EditMetricService.getMetricQuery({ metricId }));
  return data;
};
