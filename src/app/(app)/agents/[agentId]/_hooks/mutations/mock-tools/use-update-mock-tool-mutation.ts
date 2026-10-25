'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateMockToolAction } from '@/server/agents/actions';
import type { UpdateMockToolInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useUpdateMockToolMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.updateMockToolMutationKey,
    mutationFn: (input: UpdateMockToolInput) => updateMockToolAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Mock tool updated successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getMockToolsQuery({ agentId }).queryKey,
      });
    },
  });
};
