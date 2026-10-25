'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MetricKey, MetricService } from '@/app/(app)/metrics/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { createMetricAction } from '@/server/metrics/actions';
import type { CreateMetricInput } from '@/server/metrics/types';

import { CreateMetricService } from '../../_service';

export const useCreateMetricMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CreateMetricService.createMutationKey,
    mutationFn: (input: CreateMetricInput) => createMetricAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The metric is created.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
        queryClient.invalidateQueries({ queryKey: MetricService.listKey }),
        queryClient.invalidateQueries({
          queryKey: [MetricKey.metricOptions],
        }),
      ]);
    },
  });
};
