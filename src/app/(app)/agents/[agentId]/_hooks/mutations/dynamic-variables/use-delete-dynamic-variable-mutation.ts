'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteDynamicVariableAction } from '@/server/agents/actions';
import type { DynamicVariableIdInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useDeleteDynamicVariableMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.deleteDynamicVariableMutationKey,
    mutationFn: (input: DynamicVariableIdInput) =>
      deleteDynamicVariableAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Dynamic variable deleted successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getDynamicVariablesQuery({ agentId }).queryKey,
      });
    },
  });
};
