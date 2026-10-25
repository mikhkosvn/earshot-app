'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { createEvaluatorAction } from '@/server/evaluators/actions';
import type { CreateEvaluatorInput } from '@/server/evaluators/types';

export const useCreateEvaluatorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.createEvaluatorMutationKey,
    mutationFn: (input: CreateEvaluatorInput) => createEvaluatorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Evaluator created successfully');
      return invalidateEvaluatorData(queryClient);
    },
  });
};
