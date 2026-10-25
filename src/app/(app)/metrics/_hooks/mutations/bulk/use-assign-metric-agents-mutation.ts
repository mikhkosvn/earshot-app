'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { assignMetricAgentsAction } from '@/server/metrics/actions';
import type { AssignMetricAgentsInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';

export const useAssignMetricAgentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.assignAgentsMutationKey,
    mutationFn: (input: AssignMetricAgentsInput) =>
      assignMetricAgentsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The agents are assigned.');
      return queryClient.invalidateQueries({
        queryKey: MetricService.getProjectListKey({
          projectId: input.projectId,
        }),
      });
    },
  });
};
