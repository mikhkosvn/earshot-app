'use client';

import type { ReactNode } from 'react';

import type { DashboardBoardState } from '../_utils/board-types';
import type { DraftPlot } from '../_utils/dashboard-draft';
import { PlotBody } from '../charts/plot-body';
import { NewPlotBadge } from './plot-header/new-plot-badge';
import { PlotMenu } from './plot-header/plot-menu';

type StatCardProps = {
  board: DashboardBoardState;
  plot: DraftPlot;
  dragHandle: ReactNode;
};

export function StatCard({ board, plot, dragHandle }: StatCardProps) {
  return (
    <article
      aria-label={plot.config.name}
      className="relative col-span-full flex min-h-28 items-stretch rounded-lg border bg-card"
    >
      <div className="flex flex-col items-center gap-1 border-r px-1 py-2">
        {dragHandle}
        <NewPlotBadge isNew={plot.isNew} />
      </div>
      <div className="min-w-0 flex-1">
        <PlotBody board={board} config={plot.config} />
      </div>
      <div className="px-1 py-2">
        <PlotMenu board={board} plot={plot} />
      </div>
    </article>
  );
}
