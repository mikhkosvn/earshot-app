'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { renameFolderAction } from '@/server/folders/actions';
import type { RenameFolderInput } from '@/server/folders/types';

export const useRenameFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.renameFolderMutationKey,
    mutationFn: (input: RenameFolderInput) => renameFolderAction(input),
    onSuccess: async (result) => {
      if (!result.ok) return;
      toast.success('Folder renamed successfully');
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.foldersKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
