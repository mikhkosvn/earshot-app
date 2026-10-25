'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';
import { startTestCallAction } from '@/server/agents/actions';
import type { AgentIdInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useStartTestCallMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.startTestCallMutationKey,
    mutationFn: (input: AgentIdInput) => startTestCallAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
