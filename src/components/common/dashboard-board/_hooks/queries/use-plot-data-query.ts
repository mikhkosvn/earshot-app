'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import type { PlotConfig } from '@/server/dashboards/types';

import { DashboardService } from '../../_service';
import type { DashboardBoardState } from '../../_utils/board-types';

export const usePlotDataQuery = (
  board: DashboardBoardState,
  config: PlotConfig,
) =>
  useSuspenseQuery(
    DashboardService.getPlotDataQuery({
      dashboardId: board.dashboardId,
      plot: config,
      filters: board.draft.filters,
    }),
  );
