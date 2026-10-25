'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteMetricsAction } from '@/server/metrics/actions';
import type { DeleteMetricsInput } from '@/server/metrics/types';

import { MetricKey, MetricService } from '../../../_service';
import { removeMetrics } from '../../../_utils/metric-cache';

export const useDeleteMetricsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.deleteMutationKey,
    mutationFn: (input: DeleteMetricsInput) => deleteMetricsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The metrics are deleted.');
      const listKey = MetricService.getProjectListKey({
        projectId: input.projectId,
      });
      queryClient.setQueriesData(
        { queryKey: listKey },
        removeMetrics(input.metricIds),
      );
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: listKey }),
        queryClient.invalidateQueries({ queryKey: [MetricKey.predefined] }),
        queryClient.invalidateQueries({ queryKey: [MetricKey.metricOptions] }),
      ]);
    },
  });
};
