'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { bulkUpdateMetricFlagsAction } from '@/server/metrics/actions';
import type { BulkUpdateMetricFlagsInput } from '@/server/metrics/types';

import { MetricService } from '../../../_service';

export const useBulkUpdateMetricFlagsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MetricService.bulkUpdateFlagsMutationKey,
    mutationFn: (input: BulkUpdateMetricFlagsInput) =>
      bulkUpdateMetricFlagsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The settings are saved.');
      return queryClient.invalidateQueries({
        queryKey: MetricService.getProjectListKey({
          projectId: input.projectId,
        }),
      });
    },
  });
};
