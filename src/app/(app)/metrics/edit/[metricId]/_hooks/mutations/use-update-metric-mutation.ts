'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MetricKey, MetricService } from '@/app/(app)/metrics/_service';
import { updateMetricAction } from '@/server/metrics/actions';
import type { UpdateMetricInput } from '@/server/metrics/types';

import { EditMetricService } from '@/components/common/metric-history/_service';

export const useUpdateMetricMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EditMetricService.updateMutationKey,
    mutationFn: (input: UpdateMetricInput) => updateMetricAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The metric is updated.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EditMetricService.getMetricQuery({
            metricId: input.metricId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: EditMetricService.getVersionsQuery({
            metricId: input.metricId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: MetricService.listKey }),
        queryClient.invalidateQueries({
          queryKey: [MetricKey.metricOptions],
        }),
      ]);
    },
  });
};
