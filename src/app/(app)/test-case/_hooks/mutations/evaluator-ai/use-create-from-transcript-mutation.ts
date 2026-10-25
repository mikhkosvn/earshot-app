'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { invalidateEvaluatorData } from '@/app/(app)/test-case/_utils/invalidate-evaluator-data';
import { createEvaluatorFromTranscriptAction } from '@/server/evaluators/actions';
import type { CreateEvaluatorFromTranscriptInput } from '@/server/evaluators/types';

export const useCreateFromTranscriptMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.createFromTranscriptMutationKey,
    mutationFn: (input: CreateEvaluatorFromTranscriptInput) =>
      createEvaluatorFromTranscriptAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Evaluator created from the transcript');
      return invalidateEvaluatorData(queryClient);
    },
  });
};
