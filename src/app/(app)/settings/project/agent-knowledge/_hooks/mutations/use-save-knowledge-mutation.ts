'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveProjectKnowledgeAction } from '@/server/project-knowledge/actions';
import type { SaveProjectKnowledgeInput } from '@/server/project-knowledge/types';

import { KnowledgeService } from '../../_service';

export const useSaveKnowledgeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: KnowledgeService.saveKnowledgeMutationKey,
    mutationFn: (input: SaveProjectKnowledgeInput) =>
      saveProjectKnowledgeAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success(
        `The instructions are saved as version ${result.data.version}.`,
      );
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: KnowledgeService.getKnowledgeQuery({
            projectId: input.projectId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: KnowledgeService.getVersionsQuery({
            projectId: input.projectId,
          }).queryKey,
        }),
      ]);
    },
  });
};
