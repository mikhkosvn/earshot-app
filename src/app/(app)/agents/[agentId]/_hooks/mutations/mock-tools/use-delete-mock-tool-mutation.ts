'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteMockToolAction } from '@/server/agents/actions';
import type { MockToolIdInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useDeleteMockToolMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.deleteMockToolMutationKey,
    mutationFn: (input: MockToolIdInput) => deleteMockToolAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Mock tool deleted successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getMockToolsQuery({ agentId }).queryKey,
      });
    },
  });
};
