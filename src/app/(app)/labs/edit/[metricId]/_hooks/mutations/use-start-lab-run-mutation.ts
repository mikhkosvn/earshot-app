'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { JobService } from '@/components/common/background-tasks/_service';
import { startLabRunAction } from '@/server/labs/actions';
import type { StartLabRunInput } from '@/server/labs/types';

export const useStartLabRunMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.runMutationKey,
    mutationFn: (input: StartLabRunInput) => startLabRunAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The run started.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: LabService.getLabQuery({ metricId: input.metricId })
            .queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
