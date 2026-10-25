'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { restoreAgentVersionAction } from '@/server/agents/actions';
import type { AgentVersionIdInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useRestoreAgentVersionMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.restoreVersionMutationKey,
    mutationFn: (input: AgentVersionIdInput) =>
      restoreAgentVersionAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`Restored as v${result.data.version}`);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: AgentService.getVersionsQuery({ agentId }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: AgentService.getAgentQuery({ agentId }).queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: AgentService.listKey }),
      ]);
    },
  });
};
