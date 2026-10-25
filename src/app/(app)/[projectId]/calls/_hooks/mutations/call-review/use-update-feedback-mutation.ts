'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateCallFeedbackAction } from '@/server/call-logs/actions';
import type { UpdateCallFeedbackInput } from '@/server/call-logs/types';

import { CallService } from '../../../_service';

export const useUpdateFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CallService.updateFeedbackMutationKey,
    mutationFn: (input: UpdateCallFeedbackInput) =>
      updateCallFeedbackAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The feedback is saved.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: CallService.listKey }),
        queryClient.invalidateQueries({ queryKey: CallService.detailKey }),
      ]);
    },
  });
};
