'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateAgentAction } from '@/server/agents/actions';
import type { UpdateAgentInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useUpdateAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.updateMutationKey,
    mutationFn: (input: UpdateAgentInput) => updateAgentAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Agent updated successfully');
      const agentId = result.data.id;
      queryClient.setQueryData(
        AgentService.getAgentQuery({ agentId }).queryKey,
        result.data,
      );
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: AgentService.getVersionsQuery({ agentId }).queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: AgentService.listKey }),
        queryClient.invalidateQueries({ queryKey: AgentService.optionsKey }),
      ]);
    },
  });
};
