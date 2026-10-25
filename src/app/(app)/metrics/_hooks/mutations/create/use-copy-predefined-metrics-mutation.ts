'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { copyPredefinedMetricsAction } from '@/server/metrics/actions';
import type { CopyPredefinedMetricsInput } from '@/server/metrics/types';

import { MetricKey, MetricService } from '../../../_service';

export const useCopyPredefinedMetricsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.copyPredefinedMutationKey,
    mutationFn: (input: CopyPredefinedMetricsInput) =>
      copyPredefinedMetricsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The predefined metrics are added.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: MetricService.getProjectListKey({
            projectId: input.projectId,
          }),
        }),
        queryClient.invalidateQueries({ queryKey: [MetricKey.predefined] }),
        queryClient.invalidateQueries({ queryKey: [MetricKey.metricOptions] }),
      ]);
    },
  });
};
