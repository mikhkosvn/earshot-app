'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';
import { dismissAllJobsAction } from '@/server/jobs/actions';
import type { DismissAllJobsInput } from '@/server/jobs/types';

export const useDismissAllJobsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: JobService.dismissAllJobsMutationKey,
    mutationFn: (input: DismissAllJobsInput) => dismissAllJobsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
