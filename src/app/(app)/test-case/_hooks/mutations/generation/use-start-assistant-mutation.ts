'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { startEvaluatorAssistantAction } from '@/server/evaluator-generation/actions';
import type { StartEvaluatorAssistantInput } from '@/server/evaluator-generation/types';

export const useStartAssistantMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.startAssistantMutationKey,
    mutationFn: (input: StartEvaluatorAssistantInput) =>
      startEvaluatorAssistantAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.generationJobsKey,
        }),
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.generationSessionsKey,
        }),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
