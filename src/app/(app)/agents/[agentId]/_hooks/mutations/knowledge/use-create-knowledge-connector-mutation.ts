'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createKnowledgeConnectorAction } from '@/server/agents/actions';
import type { CreateKnowledgeConnectorInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useCreateKnowledgeConnectorMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.createKnowledgeConnectorMutationKey,
    mutationFn: (input: CreateKnowledgeConnectorInput) =>
      createKnowledgeConnectorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Connector created successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getKnowledgeConnectorsQuery({ agentId })
          .queryKey,
      });
    },
  });
};
