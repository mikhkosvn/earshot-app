'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteOptimizerScheduleAction } from '@/server/metric-optimizer/actions';
import type { OptimizerScheduleIdInput } from '@/server/metric-optimizer/types';

import { OptimizerScheduleService } from '../../../_service';

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: OptimizerScheduleService.deleteMutationKey,
    mutationFn: (input: OptimizerScheduleIdInput) =>
      deleteOptimizerScheduleAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The schedule is deleted.');
      return queryClient.invalidateQueries({
        queryKey: OptimizerScheduleService.listKey,
      });
    },
  });
};
