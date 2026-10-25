'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { updateMetricSampleRateAction } from '@/server/metrics/actions';
import type { UpdateMetricSampleRateInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';
import { replaceMetric } from '../../../_utils/metric-cache';

export const useUpdateMetricSampleRateMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: MetricService.updateSampleRateMutationKey,
    mutationFn: (input: UpdateMetricSampleRateInput) =>
      updateMetricSampleRateAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The sampling rate is saved.');
      queryClient.setQueriesData(
        { queryKey: MetricService.getProjectListKey({ projectId }) },
        replaceMetric(result.data),
      );
    },
  });
};
