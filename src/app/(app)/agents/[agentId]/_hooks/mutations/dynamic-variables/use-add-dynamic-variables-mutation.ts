'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addDynamicVariablesAction } from '@/server/agents/actions';
import type { AddDynamicVariablesInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useAddDynamicVariablesMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.addDynamicVariablesMutationKey,
    mutationFn: (input: AddDynamicVariablesInput) =>
      addDynamicVariablesAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Dynamic variables saved successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getDynamicVariablesQuery({ agentId }).queryKey,
      });
    },
  });
};
