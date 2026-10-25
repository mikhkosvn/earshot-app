'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';
import { startMetricGenerationAction } from '@/server/metrics/actions';
import type { StartMetricGenerationInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';

export const useStartMetricGenerationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.startGenerationMutationKey,
    mutationFn: (input: StartMetricGenerationInput) =>
      startMetricGenerationAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
