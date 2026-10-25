'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updateMonitorAction } from '@/server/monitors/actions';
import type { UpdateMonitorInput } from '@/server/monitors/types';

import { MonitorService } from '../../_service';

export const useUpdateMonitorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MonitorService.updateMutationKey,
    mutationFn: (input: UpdateMonitorInput) => updateMonitorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The monitor is saved.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: MonitorService.listKey }),
        queryClient.invalidateQueries({ queryKey: MonitorService.detailKey }),
      ]);
    },
  });
};
