'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EditMetricService } from '@/components/common/metric-history/_service';
import { useMetricId } from '@/components/common/metric-history/_hooks/use-metric-id';

export const useMetricDetail = () => {
  const metricId = useMetricId();
  const { data: metric } = useSuspenseQuery(
    EditMetricService.getMetricQuery({ metricId }),
  );
  return metric;
};
