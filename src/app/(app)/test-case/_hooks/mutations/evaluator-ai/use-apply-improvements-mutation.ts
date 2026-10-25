'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { applyEvaluatorImprovementsAction } from '@/server/evaluators/actions';
import type { ApplyEvaluatorImprovementsInput } from '@/server/evaluators/types';

export const useApplyImprovementsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.applyImprovementsMutationKey,
    mutationFn: (input: ApplyEvaluatorImprovementsInput) =>
      applyEvaluatorImprovementsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`${result.data.count} evaluator(s) updated`);
      return invalidateEvaluatorData(queryClient);
    },
  });
};
