'use client';

import { useQueryClient } from '@tanstack/react-query';

import { DashboardService } from '../_service';

export const useRefreshPlots = (dashboardId: number) => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: DashboardService.plotDataPrefix(dashboardId),
    });
};
