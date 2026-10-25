'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { answerEvaluatorAssistantAction } from '@/server/evaluator-generation/actions';
import type { AnswerEvaluatorAssistantInput } from '@/server/evaluator-generation/types';

export const useAnswerAssistantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.answerAssistantMutationKey,
    mutationFn: (input: AnswerEvaluatorAssistantInput) =>
      answerEvaluatorAssistantAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.getGenerationSessionQuery({
            sessionId: result.data.sessionId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.generationJobsKey,
        }),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
