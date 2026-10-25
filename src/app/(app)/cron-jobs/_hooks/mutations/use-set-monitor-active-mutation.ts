'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { MonitorService } from '@/components/common/monitor-dialog/_service';
import { setMonitorActiveAction } from '@/server/monitors/actions';
import type { SetMonitorActiveInput } from '@/server/monitors/types';

const activeToast = (isActive: boolean) => {
  if (isActive) return 'The monitor is active.';
  return 'The monitor is paused.';
};

export const useSetMonitorActiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MonitorService.setActiveMutationKey,
    mutationFn: (input: SetMonitorActiveInput) => setMonitorActiveAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(activeToast(result.data.isActive));
      return queryClient.invalidateQueries({
        queryKey: MonitorService.listKey,
      });
    },
  });
};
