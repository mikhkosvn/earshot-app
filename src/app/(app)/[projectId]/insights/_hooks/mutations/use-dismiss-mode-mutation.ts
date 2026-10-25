'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { dismissResearchModeAction } from '@/server/insights/actions';
import type { FailureModeIdInput } from '@/server/insights/types';

import { InsightService } from '../../_service';

export const useDismissModeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: InsightService.dismissModeMutationKey,
    mutationFn: (input: FailureModeIdInput) => dismissResearchModeAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The failure mode is dismissed.');
      return queryClient.invalidateQueries({
        queryKey: InsightService.deepResearchKey,
      });
    },
  });
};
