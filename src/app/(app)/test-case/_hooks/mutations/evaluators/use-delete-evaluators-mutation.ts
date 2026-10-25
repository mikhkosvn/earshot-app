'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { deleteEvaluatorsAction } from '@/server/evaluators/actions';
import type { EvaluatorSelectionInput } from '@/server/evaluators/types';

export const useDeleteEvaluatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.deleteEvaluatorsMutationKey,
    mutationFn: (input: EvaluatorSelectionInput) =>
      deleteEvaluatorsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`${result.data.count} evaluator(s) deleted`);
      return invalidateEvaluatorData(queryClient);
    },
  });
};
