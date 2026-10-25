'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { createEvaluatorsFromCallsAction } from '@/server/call-logs/actions';
import type { EvaluatorsFromCallsInput } from '@/server/call-logs/types';

import { CallService } from '../../../_service';

export const useCreateEvaluatorsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: CallService.useAsEvaluatorMutationKey,
    mutationFn: (input: EvaluatorsFromCallsInput) =>
      createEvaluatorsFromCallsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The evaluator generation started.');
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
