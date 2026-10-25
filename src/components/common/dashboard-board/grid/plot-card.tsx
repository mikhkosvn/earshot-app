'use client';

import type { ReactNode } from 'react';

import type { DashboardBoardState } from '../_utils/board-types';
import type { DraftPlot } from '../_utils/dashboard-draft';
import { PlotBody } from '../charts/plot-body';
import { PlotCardHeader } from './plot-header/plot-card-header';

type PlotCardProps = {
  board: DashboardBoardState;
  plot: DraftPlot;
  dragHandle: ReactNode;
};

export function PlotCard({ board, plot, dragHandle }: PlotCardProps) {
  return (
    <article
      aria-label={plot.config.name}
      className="flex h-96 flex-col overflow-hidden rounded-lg border bg-card"
    >
      <PlotCardHeader board={board} plot={plot} dragHandle={dragHandle} />
      <div className="min-h-0 flex-1">
        <PlotBody board={board} config={plot.config} />
      </div>
    </article>
  );
}
