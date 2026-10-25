'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { renameResultAction } from '@/server/results/actions';
import type { RenameResultInput } from '@/server/results/types';

import { ResultService } from '../../../_service';

export const useRenameResultMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.renameResultMutationKey,
    mutationFn: (input: RenameResultInput) => renameResultAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The result is renamed.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ResultService.listKey }),
        queryClient.invalidateQueries({ queryKey: ResultService.detailKey }),
      ]);
    },
  });
};
