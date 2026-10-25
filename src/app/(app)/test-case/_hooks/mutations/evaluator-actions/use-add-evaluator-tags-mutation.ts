'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { addEvaluatorTagsAction } from '@/server/evaluators/actions';
import type { AddEvaluatorTagsInput } from '@/server/evaluators/types';

export const useAddEvaluatorTagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.addTagsMutationKey,
    mutationFn: (input: AddEvaluatorTagsInput) => addEvaluatorTagsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`Tags added to ${result.data.count} scenario(s)`);
      return invalidateEvaluatorData(queryClient);
    },
  });
};
