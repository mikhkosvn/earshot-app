'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { modifyEvaluatorsAction } from '@/server/evaluators/actions';
import type { ModifyEvaluatorsInput } from '@/server/evaluators/types';

export const useModifyEvaluatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.modifyEvaluatorsMutationKey,
    mutationFn: (input: ModifyEvaluatorsInput) => modifyEvaluatorsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`${result.data.count} scenario(s) updated`);
      return invalidateEvaluatorData(queryClient);
    },
  });
};
