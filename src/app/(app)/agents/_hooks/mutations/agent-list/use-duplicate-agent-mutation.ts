'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { duplicateAgentAction } from '@/server/agents/actions';
import type { AgentIdInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useDuplicateAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.duplicateMutationKey,
    mutationFn: (input: AgentIdInput) => duplicateAgentAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Agent duplicated successfully');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: AgentService.listKey }),
        queryClient.invalidateQueries({ queryKey: AgentService.optionsKey }),
      ]);
    },
  });
};
