'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { restoreEvaluatorVersionAction } from '@/server/evaluators/actions';
import type { RestoreEvaluatorVersionInput } from '@/server/evaluators/types';

export const useRestoreVersionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.restoreVersionMutationKey,
    mutationFn: (input: RestoreEvaluatorVersionInput) =>
      restoreEvaluatorVersionAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The version is restored');
      return invalidateEvaluatorData(queryClient);
    },
  });
};
