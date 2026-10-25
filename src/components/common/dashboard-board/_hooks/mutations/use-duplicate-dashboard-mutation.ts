'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { duplicateDashboardAction } from '@/server/dashboards/actions';
import type { DashboardIdInput } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';

export const useDuplicateDashboardMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: DashboardService.duplicateMutationKey,
    mutationFn: (input: DashboardIdInput) => duplicateDashboardAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The dashboard is duplicated.');
      return queryClient.invalidateQueries({
        queryKey: DashboardService.listKey,
      });
    },
  });
};
