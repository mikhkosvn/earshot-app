'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { MetricService } from '@/app/(app)/metrics/_service';
import { EditMetricService } from '@/components/common/metric-history/_service';
import { applyOptimizationProposalAction } from '@/server/metric-optimizer/actions';
import type { OptimizationSessionInput } from '@/server/metric-optimizer/types';

export const useApplyProposalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.applyProposalMutationKey,
    mutationFn: (input: OptimizationSessionInput) =>
      applyOptimizationProposalAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      const metricId = result.data.id;
      toast.success('The proposal is applied as a new metric version.');
      queryClient.setQueryData(
        EditMetricService.getMetricQuery({ metricId }).queryKey,
        result.data,
      );
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EditMetricService.getVersionsQuery({ metricId }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: LabService.getLabQuery({ metricId }).queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: LabService.listKey }),
        queryClient.invalidateQueries({ queryKey: MetricService.listKey }),
      ]);
    },
  });
};
