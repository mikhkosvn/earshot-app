'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteKnowledgeFileAction } from '@/server/agents/actions';
import type { KnowledgeFileIdInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useDeleteKnowledgeFileMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.deleteKnowledgeFileMutationKey,
    mutationFn: (input: KnowledgeFileIdInput) =>
      deleteKnowledgeFileAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('File deleted successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getKnowledgeFilesQuery({ agentId }).queryKey,
      });
    },
  });
};
