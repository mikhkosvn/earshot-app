'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { dismissOptimizationProposalAction } from '@/server/metric-optimizer/actions';
import type { OptimizationSessionInput } from '@/server/metric-optimizer/types';

export const useDismissProposalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.dismissProposalMutationKey,
    mutationFn: (input: OptimizationSessionInput) =>
      dismissOptimizationProposalAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The proposal is dismissed. The metric keeps its current version.');
      return queryClient.invalidateQueries({
        queryKey: LabService.getLabQuery({ metricId: result.data.metricId })
          .queryKey,
      });
    },
  });
};
