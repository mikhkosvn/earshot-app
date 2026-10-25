'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setMockToolsEnabledAction } from '@/server/agents/actions';
import type { SetMockToolsEnabledInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';

export const useSetMockToolsEnabledMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.setMockToolsEnabledMutationKey,
    mutationFn: (input: SetMockToolsEnabledInput) =>
      setMockToolsEnabledAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: AgentService.getAgentQuery({ agentId: input.agentId })
          .queryKey,
      });
    },
  });
};
