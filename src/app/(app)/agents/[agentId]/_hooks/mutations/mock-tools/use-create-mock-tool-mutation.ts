'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMockToolAction } from '@/server/agents/actions';
import type { CreateMockToolInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useCreateMockToolMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.createMockToolMutationKey,
    mutationFn: (input: CreateMockToolInput) => createMockToolAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Mock tool created successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getMockToolsQuery({ agentId }).queryKey,
      });
    },
  });
};
