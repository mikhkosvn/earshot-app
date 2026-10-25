'use client';

import type { ReactNode } from 'react';

import type { DashboardBoardState } from '../../_utils/board-types';
import type { DraftPlot } from '../../_utils/dashboard-draft';
import { NewPlotBadge } from './new-plot-badge';
import { PlotHeaderActions } from './plot-header-actions';
import { PlotIcon } from './plot-icon';
import { PlotMenu } from './plot-menu';

interface PlotCardHeaderProps {
  board: DashboardBoardState;
  plot: DraftPlot;
  dragHandle: ReactNode;
}

export function PlotCardHeader({
  board,
  plot,
  dragHandle,
}: PlotCardHeaderProps) {
  return (
    <div className="flex items-center gap-1.5 border-b px-2 py-1.5">
      {dragHandle}
      <PlotIcon
        displayType={plot.config.displayType}
        className="size-4 shrink-0 text-muted-foreground"
      />
      <h3 className="min-w-0 flex-1 truncate text-sm font-medium">
        {plot.config.name}
      </h3>
      <NewPlotBadge isNew={plot.isNew} />
      <PlotHeaderActions board={board} plot={plot} />
      <PlotMenu board={board} plot={plot} />
    </div>
  );
}
