'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { duplicateFolderAction } from '@/server/folders/actions';
import type { FolderTargetInput } from '@/server/folders/types';

export const useDuplicateFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.duplicateFolderMutationKey,
    mutationFn: (input: FolderTargetInput) => duplicateFolderAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`Folder duplicated as "${result.data.path}"`);
      return queryClient.invalidateQueries({
        queryKey: EvaluatorService.foldersKey,
      });
    },
  });
};
