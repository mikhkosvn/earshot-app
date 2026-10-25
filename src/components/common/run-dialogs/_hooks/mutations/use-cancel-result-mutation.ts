'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cancelResultAction } from '@/server/runs/actions';
import type { ResultIdInput } from '@/server/runs/types';

import { RunDialogService } from '../../_service';

export const useCancelResultMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: RunDialogService.cancelResultMutationKey,
    mutationFn: (input: ResultIdInput) => cancelResultAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`${result.data.cancelledCount} queued run(s) cancelled.`);
      return queryClient.invalidateQueries({
        queryKey: RunDialogService.getBatchStatusQuery({
          resultId: result.data.resultId,
        }).queryKey,
      });
    },
  });
};
