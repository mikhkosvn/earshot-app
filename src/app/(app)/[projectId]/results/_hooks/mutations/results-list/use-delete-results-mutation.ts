'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteResultsAction } from '@/server/results/actions';
import type { DeleteResultsInput } from '@/server/results/types';

import { ResultService } from '../../../_service';

export const useDeleteResultsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.deleteResultsMutationKey,
    mutationFn: (input: DeleteResultsInput) => deleteResultsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The results are deleted.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ResultService.listKey }),
        queryClient.invalidateQueries({ queryKey: ResultService.runsKey }),
      ]);
    },
  });
};
