'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateRunEvaluationAction } from '@/server/run-reviews/actions';
import type { UpdateRunEvaluationInput } from '@/server/run-reviews/types';

import { ResultService } from '../../../_service';
import { invalidateRunQueries } from '../../../_utils/runs/invalidate-run-queries';

export const useUpdateRunEvaluationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.updateRunEvaluationMutationKey,
    mutationFn: (input: UpdateRunEvaluationInput) =>
      updateRunEvaluationAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The evaluation is saved.');
      return invalidateRunQueries(queryClient);
    },
  });
};
