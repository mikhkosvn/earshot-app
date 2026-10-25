'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { startInsightRunAction } from '@/server/insights/actions';
import type { RunInsightInput } from '@/server/insights/types';

import { InsightService } from '../../_service';
import { waitForJob } from '../../_utils/wait-for-job';

export const useRunInsightMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.runMutationKey,
    mutationFn: async (input: RunInsightInput) => {
      const result = await startInsightRunAction(input);
      if (result.ok) {
        toast.success('The insight run started.');
        void queryClient.invalidateQueries({
          queryKey: JobService.recentJobsKey,
        });
      }
      return waitForJob(result);
    },
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: InsightService.overviewKey,
      });
    },
  });
};
