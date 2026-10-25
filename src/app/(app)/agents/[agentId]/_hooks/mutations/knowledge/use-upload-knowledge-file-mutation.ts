'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { uploadKnowledgeFileAction } from '@/server/agents/actions';
import type { UploadKnowledgeFileInput } from '@/server/agents/types';

import { AgentService } from '../../../../_service';
import { useAgentId } from '../../use-agent-id';

export const useUploadKnowledgeFileMutation = () => {
  const queryClient = useQueryClient();
  const agentId = useAgentId();

  return useMutation({
    mutationKey: AgentService.uploadKnowledgeFileMutationKey,
    mutationFn: (input: UploadKnowledgeFileInput) =>
      uploadKnowledgeFileAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('File uploaded successfully');
      return queryClient.invalidateQueries({
        queryKey: AgentService.getKnowledgeFilesQuery({ agentId }).queryKey,
      });
    },
  });
};
