'use client';

import type { DashboardSource } from '@/generated/prisma/enums';

import { useDashboardBoard } from './_hooks/use-dashboard-board';
import { PlotGrid } from './grid/plot-grid';
import { PlotDialog } from './plot-dialog/plot-dialog';
import { DashboardToolbar } from './toolbar/dashboard-toolbar';
import { UnsavedChangesBar } from './unsaved-changes-bar';

type DashboardBoardProps = {
  dashboardId: number;
  source: DashboardSource;
};

export function DashboardBoard({ dashboardId, source }: DashboardBoardProps) {
  const { board, plotDialog, closePlotDialog } = useDashboardBoard(
    dashboardId,
    source,
  );

  return (
    <div className="flex flex-col gap-3">
      <DashboardToolbar board={board} />
      <UnsavedChangesBar board={board} />
      <PlotGrid board={board} />
      <PlotDialog board={board} state={plotDialog} onClose={closePlotDialog} />
    </div>
  );
}
