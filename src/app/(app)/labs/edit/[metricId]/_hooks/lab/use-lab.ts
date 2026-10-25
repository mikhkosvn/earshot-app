'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { LabService } from '@/app/(app)/labs/_service';

import { useLabMetricId } from './use-lab-metric-id';

export const useLab = () => {
  const metricId = useLabMetricId();
  const { data } = useSuspenseQuery(LabService.getLabQuery({ metricId }));
  return data;
};
