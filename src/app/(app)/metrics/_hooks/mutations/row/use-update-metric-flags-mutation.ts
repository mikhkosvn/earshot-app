'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { updateMetricFlagsAction } from '@/server/metrics/actions';
import type { UpdateMetricFlagsInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';
import { replaceMetric } from '../../../_utils/metric-cache';

export const useUpdateMetricFlagsMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: MetricService.updateFlagsMutationKey,
    mutationFn: (input: UpdateMetricFlagsInput) =>
      updateMetricFlagsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      queryClient.setQueriesData(
        { queryKey: MetricService.getProjectListKey({ projectId }) },
        replaceMetric(result.data),
      );
    },
  });
};
