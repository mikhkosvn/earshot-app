'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { JobService } from '@/components/common/background-tasks/_service';
import { dismissJobAction } from '@/server/jobs/actions';
import type { DismissJobInput } from '@/server/jobs/types';

export const useDismissJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: JobService.dismissJobMutationKey,
    mutationFn: (input: DismissJobInput) => dismissJobAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: JobService.recentJobsKey,
      });
    },
  });
};
