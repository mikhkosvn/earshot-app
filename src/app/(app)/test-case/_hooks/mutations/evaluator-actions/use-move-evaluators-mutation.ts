'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { moveEvaluatorsAction } from '@/server/evaluators/actions';
import type { MoveEvaluatorsInput } from '@/server/evaluators/types';

export const useMoveEvaluatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.moveEvaluatorsMutationKey,
    mutationFn: (input: MoveEvaluatorsInput) => moveEvaluatorsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(
        `${result.data.count} scenario(s) moved to ${result.data.folderPath}`,
      );
      return invalidateEvaluatorData(queryClient);
    },
  });
};
