'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useEvaluatorListParams } from '@/app/(app)/test-case/_hooks/use-evaluator-list-params';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { renameFolderAction } from '@/server/folders/actions';
import type { RenameFolderInput } from '@/server/folders/types';

export const useRenameFolderMutation = () => {
  const queryClient = useQueryClient();
  const [params, setParams] = useEvaluatorListParams();

  return useMutation({
    mutationKey: EvaluatorService.renameFolderMutationKey,
    mutationFn: (input: RenameFolderInput) => renameFolderAction(input),
    onSuccess: async (result, input) => {
      if (!result.ok) return;
      toast.success('Folder renamed successfully');
      if (params.folder === input.path) {
        await setParams({ folder: result.data.path });
      }
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.foldersKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
