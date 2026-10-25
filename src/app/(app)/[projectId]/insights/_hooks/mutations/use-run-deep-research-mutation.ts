'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { startDeepResearchAction } from '@/server/insights/actions';
import type { ProjectScopeInput } from '@/server/insights/types';

import { InsightService } from '../../_service';
import { waitForJob } from '../../_utils/wait-for-job';

export const useRunDeepResearchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.runDeepResearchMutationKey,
    mutationFn: async (input: ProjectScopeInput) => {
      const result = await startDeepResearchAction(input);
      if (result.ok) {
        toast.success('The Deep Research run started.');
        void queryClient.invalidateQueries({
          queryKey: JobService.recentJobsKey,
        });
      }
      return waitForJob(result);
    },
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: InsightService.deepResearchKey,
      });
    },
  });
};
