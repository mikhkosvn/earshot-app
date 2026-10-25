'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createDashboardAction } from '@/server/dashboards/actions';
import type { CreateDashboardInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

export const useCreateDashboardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.createMutationKey,
    mutationFn: (input: CreateDashboardInput) => createDashboardAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The dashboard is created.');
      return queryClient.invalidateQueries({
        queryKey: DashboardService.listKey,
      });
    },
  });
};
