'use client';

import { useReducer, useState } from 'react';

import type { DashboardSource } from '@/generated/prisma/enums';

import { PlotDialogMode } from '../_constants/draft-action-type';
import type { DashboardBoardState } from '../_utils/board-types';
import { draftReducer, initDraft } from '../_utils/dashboard-draft';
import { useDashboardDetailQuery } from './queries/use-dashboard-detail-query';

export type PlotDialogState =
  | { mode: typeof PlotDialogMode.closed }
  | { mode: typeof PlotDialogMode.create }
  | { mode: typeof PlotDialogMode.edit; key: string };

export const useDashboardBoard = (
  dashboardId: number,
  source: DashboardSource,
) => {
  const { data: detail } = useDashboardDetailQuery(dashboardId);
  const [draft, dispatch] = useReducer(draftReducer, detail, initDraft);
  const [plotDialog, setPlotDialog] = useState<PlotDialogState>({
    mode: PlotDialogMode.closed,
  });
  const board: DashboardBoardState = {
    dashboardId,
    source,
    draft,
    dispatch,
    openCreatePlot: () => setPlotDialog({ mode: PlotDialogMode.create }),
    openEditPlot: (key) => setPlotDialog({ mode: PlotDialogMode.edit, key }),
  };
  const closePlotDialog = () => setPlotDialog({ mode: PlotDialogMode.closed });
  return { board, plotDialog, closePlotDialog };
};
