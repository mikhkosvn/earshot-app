'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteKnowledgeConnectorAction } from '@/server/agents/actions';
import type { KnowledgeConnectorIdInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useDeleteKnowledgeConnectorMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.deleteKnowledgeConnectorMutationKey,
    mutationFn: (input: KnowledgeConnectorIdInput) =>
      deleteKnowledgeConnectorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Connector deleted successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getKnowledgeConnectorsQuery({ agentId })
          .queryKey,
      });
    },
  });
};
