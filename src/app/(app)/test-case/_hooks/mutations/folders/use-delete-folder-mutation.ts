'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useEvaluatorListParams } from '@/app/(app)/test-case/_hooks/use-evaluator-list-params';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { deleteFolderAction } from '@/server/folders/actions';
import { DEFAULT_FOLDER_PATH } from '@/server/folders/constants';
import type { FolderTargetInput } from '@/server/folders/types';

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const [, setParams] = useEvaluatorListParams();

  return useMutation({
    mutationKey: EvaluatorService.deleteFolderMutationKey,
    mutationFn: (input: FolderTargetInput) => deleteFolderAction(input),
    onSuccess: async (result) => {
      if (!result.ok) return;
      toast.success('Folder deleted successfully');
      await setParams({ folder: DEFAULT_FOLDER_PATH, page: null });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.foldersKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
