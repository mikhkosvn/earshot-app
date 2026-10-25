'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMonitorAction } from '@/server/monitors/actions';
import type { CreateMonitorInput } from '@/server/monitors/types';

import { MonitorService } from '../../_service';

export const useCreateMonitorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MonitorService.createMutationKey,
    mutationFn: (input: CreateMonitorInput) => createMonitorAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The monitor is created.');
      return queryClient.invalidateQueries({
        queryKey: MonitorService.listKey,
      });
    },
  });
};
