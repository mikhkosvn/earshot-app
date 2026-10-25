'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';

import { ResultService } from '../../../_service';
import { invalidateRunAndListQueries } from '../../../_utils/runs/invalidate-run-queries';
import {
  type ReevaluateTarget,
  reevaluateTargets,
} from '../../../_utils/runs/reevaluate-targets';

interface ReevaluateMetricsVariables {
  targets: ReevaluateTarget[];
  metricIds: number[];
}

export const useReevaluateMetricsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.reevaluateMutationKey,
    mutationFn: ({ targets, metricIds }: ReevaluateMetricsVariables) =>
      reevaluateTargets(targets, metricIds),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The reevaluation is started.');
      return Promise.all([
        invalidateRunAndListQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
