'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateDynamicVariableAction } from '@/server/agents/actions';
import type { UpdateDynamicVariableInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useUpdateDynamicVariableMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.updateDynamicVariableMutationKey,
    mutationFn: (input: UpdateDynamicVariableInput) =>
      updateDynamicVariableAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Dynamic variable updated successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getDynamicVariablesQuery({ agentId }).queryKey,
      });
    },
  });
};
