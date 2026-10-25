'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { duplicateEvaluatorsAction } from '@/server/evaluators/actions';
import type { DuplicateEvaluatorsInput } from '@/server/evaluators/types';

export const useDuplicateEvaluatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.duplicateEvaluatorsMutationKey,
    mutationFn: (input: DuplicateEvaluatorsInput) =>
      duplicateEvaluatorsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`${result.data.count} scenario(s) duplicated`);
      return invalidateEvaluatorData(queryClient);
    },
  });
};
