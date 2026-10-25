'use client';

import type { ReactNode } from 'react';

import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';

import type { DashboardBoardState } from '../_utils/board-types';
import type { DraftPlot } from '../_utils/dashboard-draft';
import { PlotCard } from './plot-card';
import { StatCard } from './stat-card';

interface PlotFrameProps {
  board: DashboardBoardState;
  plot: DraftPlot;
  dragHandle: ReactNode;
}

export function PlotFrame({ board, plot, dragHandle }: PlotFrameProps) {
  if (plot.config.displayType === PlotDisplayType.stat) {
    return <StatCard board={board} plot={plot} dragHandle={dragHandle} />;
  }
  return <PlotCard board={board} plot={plot} dragHandle={dragHandle} />;
}
