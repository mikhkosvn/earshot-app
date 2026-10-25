'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { renameAgentVersionAction } from '@/server/agents/actions';
import type { RenameAgentVersionInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';

export const useRenameAgentVersionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: AgentService.renameVersionMutationKey,
    mutationFn: (input: RenameAgentVersionInput) =>
      renameAgentVersionAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Version renamed successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getVersionsQuery({
          agentId: result.data.agentId,
        }).queryKey,
      });
    },
  });
};
