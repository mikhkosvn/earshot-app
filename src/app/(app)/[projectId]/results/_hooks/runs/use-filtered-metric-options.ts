'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { MetricService } from '@/app/(app)/metrics/_service';
import type { MetricOption } from '@/server/metrics/types';

const matchesSearch = (metric: MetricOption, search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return `${metric.id} ${metric.name}`.toLowerCase().includes(term);
};

export const useFilteredMetricOptions = (search: string) => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery({
    ...MetricService.getMetricOptionsQuery({ projectId }),
    select: (metrics) =>
      metrics.filter((metric) => matchesSearch(metric, search)),
  });
  return data;
};
