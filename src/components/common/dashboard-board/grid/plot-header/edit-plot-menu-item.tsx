'use client';

import { PencilIcon } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';

import type { DashboardBoardState } from '../../_utils/board-types';
import type { DraftPlot } from '../../_utils/dashboard-draft';

interface EditPlotMenuItemProps {
  board: DashboardBoardState;
  plot: DraftPlot;
}

export function EditPlotMenuItem({ board, plot }: EditPlotMenuItemProps) {
  if (plot.config.displayType === PlotDisplayType.stat) return null;
  return (
    <DropdownMenuItem onClick={() => board.openEditPlot(plot.key)}>
      <PencilIcon />
      Edit Plot
    </DropdownMenuItem>
  );
}
