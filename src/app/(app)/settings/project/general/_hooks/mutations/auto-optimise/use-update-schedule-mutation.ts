'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateOptimizerScheduleAction } from '@/server/metric-optimizer/actions';
import type { UpdateOptimizerScheduleInput } from '@/server/metric-optimizer/types';

import { OptimizerScheduleService } from '../../../_service';

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: OptimizerScheduleService.updateMutationKey,
    mutationFn: (input: UpdateOptimizerScheduleInput) =>
      updateOptimizerScheduleAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The schedule is saved.');
      return queryClient.invalidateQueries({
        queryKey: OptimizerScheduleService.listKey,
      });
    },
  });
};
