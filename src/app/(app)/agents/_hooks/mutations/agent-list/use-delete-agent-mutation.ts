'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteAgentAction } from '@/server/agents/actions';
import type { DeleteAgentInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useDeleteAgentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.deleteMutationKey,
    mutationFn: (input: DeleteAgentInput) => deleteAgentAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Agent deleted successfully');
      queryClient.removeQueries({
        queryKey: AgentService.getAgentQuery({ agentId: result.data.agentId })
          .queryKey,
      });
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: AgentService.listKey }),
        queryClient.invalidateQueries({ queryKey: AgentService.optionsKey }),
      ]);
    },
  });
};
