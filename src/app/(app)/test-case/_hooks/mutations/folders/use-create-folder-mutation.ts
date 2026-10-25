'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { createFolderAction } from '@/server/folders/actions';
import type { CreateFolderInput } from '@/server/folders/types';

export const useCreateFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.createFolderMutationKey,
    mutationFn: (input: CreateFolderInput) => createFolderAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Folder created successfully');
      return queryClient.invalidateQueries({
        queryKey: EvaluatorService.foldersKey,
      });
    },
  });
};
