'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MonitorService } from '@/components/common/monitor-dialog/_service';
import { deleteMonitorAction } from '@/server/monitors/actions';
import type { MonitorIdInput } from '@/server/monitors/types';

export const useDeleteMonitorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MonitorService.deleteMutationKey,
    mutationFn: (input: MonitorIdInput) => deleteMonitorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The monitor is deleted.');
      queryClient.removeQueries({
        queryKey: MonitorService.getMonitorQuery({ monitorId: result.data.id })
          .queryKey,
      });
      return queryClient.invalidateQueries({
        queryKey: MonitorService.listKey,
      });
    },
  });
};
