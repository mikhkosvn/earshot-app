'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCallReviewAction } from '@/server/call-logs/actions';
import type { UpdateCallReviewInput } from '@/server/call-logs/types';

import { CallService } from '../../../_service';

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CallService.updateReviewMutationKey,
    mutationFn: (input: UpdateCallReviewInput) => updateCallReviewAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The review is saved.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: CallService.listKey }),
        queryClient.invalidateQueries({ queryKey: CallService.detailKey }),
      ]);
    },
  });
};
