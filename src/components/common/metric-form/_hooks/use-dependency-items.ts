'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { MetricService } from '@/app/(app)/metrics/_service';

export const useDependencyItems = () => {
  const projectId = useCurrentProjectId();
  const { metricId } = useParams<{ metricId?: string }>();
  const { data: items } = useSuspenseQuery({
    ...MetricService.getMetricOptionsQuery({ projectId }),
    select: (metrics) =>
      metrics
        .filter((metric) => String(metric.id) !== metricId)
        .map((metric) => ({
          value: metric.id,
          label: `${metric.id} ${metric.name}`,
        })),
  });
  return items;
};
