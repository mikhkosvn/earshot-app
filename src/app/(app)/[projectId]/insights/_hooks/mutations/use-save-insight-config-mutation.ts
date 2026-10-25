'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveInsightConfigAction } from '@/server/insights/actions';
import type { SaveInsightConfigInput } from '@/server/insights/types';

import { InsightService } from '../../_service';

export const useSaveInsightConfigMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.saveConfigMutationKey,
    mutationFn: (input: SaveInsightConfigInput) =>
      saveInsightConfigAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Insights are on for this metric.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: InsightService.overviewKey }),
        queryClient.invalidateQueries({
          queryKey: InsightService.metricOptionsKey,
        }),
      ]);
    },
  });
};
