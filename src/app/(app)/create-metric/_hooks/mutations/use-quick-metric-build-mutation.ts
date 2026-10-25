'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { startQuickMetricBuildAction } from '@/server/metrics/actions';
import type { StartQuickMetricBuildInput } from '@/server/metrics/types';

import { CreateMetricService } from '../../_service';

export const useQuickMetricBuildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CreateMetricService.quickBuildMutationKey,
    mutationFn: (input: StartQuickMetricBuildInput) =>
      startQuickMetricBuildAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The metric build started.');
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
