'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createOptimizerScheduleAction } from '@/server/metric-optimizer/actions';
import type { CreateOptimizerScheduleInput } from '@/server/metric-optimizer/types';

import { OptimizerScheduleService } from '../../../_service';

export const useCreateScheduleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: OptimizerScheduleService.createMutationKey,
    mutationFn: (input: CreateOptimizerScheduleInput) =>
      createOptimizerScheduleAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The schedule is created.');
      return queryClient.invalidateQueries({
        queryKey: OptimizerScheduleService.listKey,
      });
    },
  });
};
