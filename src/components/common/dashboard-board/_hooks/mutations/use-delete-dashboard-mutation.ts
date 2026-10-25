'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteDashboardAction } from '@/server/dashboards/actions';
import type { DashboardIdInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

export const useDeleteDashboardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.deleteMutationKey,
    mutationFn: (input: DashboardIdInput) => deleteDashboardAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The dashboard is deleted.');
      return queryClient.invalidateQueries({
        queryKey: DashboardService.listKey,
      });
    },
  });
};
