'use client';

import { useQueryClient } from '@tanstack/react-query';

import type { PlotConfig } from '@/server/dashboards/types';

import { DashboardService } from '../_service';
import type { DashboardBoardState } from '../_utils/board-types';

export const useRefreshPlot = (
  board: DashboardBoardState,
  config: PlotConfig,
) => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: DashboardService.getPlotDataQuery({
        dashboardId: board.dashboardId,
        plot: config,
        filters: board.draft.filters,
      }).queryKey,
      exact: true,
    });
};
