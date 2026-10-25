'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAgentAction } from '@/server/agents/actions';
import type { CreateAgentInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useCreateAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.createMutationKey,
    mutationFn: (input: CreateAgentInput) => createAgentAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Agent created successfully');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: AgentService.listKey }),
        queryClient.invalidateQueries({ queryKey: AgentService.optionsKey }),
      ]);
    },
  });
};
