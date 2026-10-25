'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { MetricService } from '@/app/(app)/metrics/_service';
import { EditMetricService } from '@/components/common/metric-history/_service';
import { updateMetricAction } from '@/server/metrics/actions';
import type { UpdateMetricInput } from '@/server/metrics/types';

export const useSaveLabMetricMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.saveMetricMutationKey,
    mutationFn: (input: UpdateMetricInput) => updateMetricAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The metric is saved as a new version.');
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
        queryClient.invalidateQueries({ queryKey: LabService.listKey }),
        queryClient.invalidateQueries({ queryKey: MetricService.listKey }),
      ]);
    },
  });
};
