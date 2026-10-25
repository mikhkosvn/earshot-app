'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EditMetricService } from '../_service';
import { useMetricId } from './use-metric-id';

export const useMetricDetail = () => {
  const metricId = useMetricId();
  const { data: metric } = useSuspenseQuery(
    EditMetricService.getMetricQuery({ metricId }),
  );
  return metric;
};
