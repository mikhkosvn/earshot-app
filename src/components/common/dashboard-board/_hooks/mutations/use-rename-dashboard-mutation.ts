'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { renameDashboardAction } from '@/server/dashboards/actions';
import type { RenameDashboardInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

export const useRenameDashboardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.renameMutationKey,
    mutationFn: (input: RenameDashboardInput) => renameDashboardAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The dashboard is renamed.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: DashboardService.listKey }),
        queryClient.invalidateQueries({
          queryKey: DashboardService.getDetailQuery({
            dashboardId: input.dashboardId,
          }).queryKey,
        }),
      ]);
    },
  });
};
