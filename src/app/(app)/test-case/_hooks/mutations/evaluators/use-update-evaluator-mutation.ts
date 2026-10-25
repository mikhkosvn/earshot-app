'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { updateEvaluatorAction } from '@/server/evaluators/actions';
import type { UpdateEvaluatorInput } from '@/server/evaluators/types';

export const useUpdateEvaluatorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.updateEvaluatorMutationKey,
    mutationFn: (input: UpdateEvaluatorInput) => updateEvaluatorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Evaluator updated successfully');
      return invalidateEvaluatorData(queryClient);
    },
  });
};
