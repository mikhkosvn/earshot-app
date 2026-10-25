'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reorderMetricsAction } from '@/server/metrics/actions';
import type { ReorderMetricsInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';

export const useReorderMetricsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.reorderMutationKey,
    mutationFn: (input: ReorderMetricsInput) => reorderMetricsAction(input),
    onSettled: (result, _error, input) => {
      if (result?.ok) return;
      return queryClient.invalidateQueries({
        queryKey: MetricService.getProjectListKey({
          projectId: input.projectId,
        }),
      });
    },
  });
};
