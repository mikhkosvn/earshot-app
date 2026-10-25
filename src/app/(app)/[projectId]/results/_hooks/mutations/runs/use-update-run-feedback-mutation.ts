'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateRunFeedbackAction } from '@/server/run-reviews/actions';
import type { UpdateRunFeedbackInput } from '@/server/run-reviews/types';

import { ResultService } from '../../../_service';
import { invalidateRunQueries } from '../../../_utils/runs/invalidate-run-queries';

export const useUpdateRunFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.updateRunFeedbackMutationKey,
    mutationFn: (input: UpdateRunFeedbackInput) =>
      updateRunFeedbackAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The feedback is saved.');
      return invalidateRunQueries(queryClient);
    },
  });
};
