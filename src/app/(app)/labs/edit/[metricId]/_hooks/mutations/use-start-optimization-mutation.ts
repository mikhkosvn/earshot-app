'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { startMetricOptimizationAction } from '@/server/metric-optimizer/actions';
import type { StartMetricOptimizationInput } from '@/server/metric-optimizer/types';

export const useStartOptimizationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.optimizeMutationKey,
    mutationFn: (input: StartMetricOptimizationInput) =>
      startMetricOptimizationAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('Auto improve started.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: LabService.getLabQuery({ metricId: input.metricId })
            .queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
