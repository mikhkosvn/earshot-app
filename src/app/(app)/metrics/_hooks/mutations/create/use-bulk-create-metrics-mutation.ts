'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { JobService } from '@/components/common/background-tasks/_service';
import { bulkCreateMetricsAction } from '@/server/metrics/actions';
import type { BulkCreateMetricsInput } from '@/server/metrics/types';

import { MetricKey, MetricService } from '../../../_service';

export const useBulkCreateMetricsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.bulkCreateMutationKey,
    mutationFn: (input: BulkCreateMetricsInput) =>
      bulkCreateMetricsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The metrics are saved.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: MetricService.getProjectListKey({
            projectId: input.projectId,
          }),
        }),
        queryClient.invalidateQueries({ queryKey: [MetricKey.metricOptions] }),
        queryClient.invalidateQueries({ queryKey: JobService.recentJobsKey }),
      ]);
    },
  });
};
