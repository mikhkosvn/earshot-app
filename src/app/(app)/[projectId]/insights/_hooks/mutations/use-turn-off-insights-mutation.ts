'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { turnOffInsightsAction } from '@/server/insights/actions';
import type { InsightMetricInput } from '@/server/insights/types';

import { InsightService } from '../../_service';

export const useTurnOffInsightsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.turnOffMutationKey,
    mutationFn: (input: InsightMetricInput) => turnOffInsightsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Insights are off for this metric.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: InsightService.overviewKey }),
        queryClient.invalidateQueries({
          queryKey: InsightService.metricOptionsKey,
        }),
      ]);
    },
  });
};
