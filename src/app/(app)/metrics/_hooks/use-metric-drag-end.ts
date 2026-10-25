'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import { useQueryClient } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { MetricListItem } from '@/server/metrics/types';

import { moveMetric } from '../_utils/move-metric';
import { useReorderMetricsMutation } from './mutations/row/use-reorder-metrics-mutation';
import { useMetricListQuery } from './use-metric-list-query';

export const useMetricDragEnd = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();
  const listQuery = useMetricListQuery();
  const reorderMetrics = useReorderMetricsMutation();

  return ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const metrics = queryClient.getQueryData<MetricListItem[]>(
      listQuery.queryKey,
    );
    if (!metrics) return;
    const moved = moveMetric(metrics, Number(active.id), Number(over.id));
    if (!moved) return;
    queryClient.setQueryData(listQuery.queryKey, moved);
    reorderMetrics.mutate({
      projectId,
      metricIds: moved.map((metric) => metric.id),
    });
  };
};
