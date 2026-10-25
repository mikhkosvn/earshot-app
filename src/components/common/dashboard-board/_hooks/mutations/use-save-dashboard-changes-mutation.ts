'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveDashboardChangesAction } from '@/server/dashboards/actions';
import type { SaveDashboardChangesInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

export const useSaveDashboardChangesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.saveMutationKey,
    mutationFn: (input: SaveDashboardChangesInput) =>
      saveDashboardChangesAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('The dashboard is saved.');
      queryClient.setQueryData(
        DashboardService.getDetailQuery({ dashboardId: input.dashboardId })
          .queryKey,
        result.data,
      );
      return queryClient.invalidateQueries({
        queryKey: DashboardService.listKey,
      });
    },
  });
};
