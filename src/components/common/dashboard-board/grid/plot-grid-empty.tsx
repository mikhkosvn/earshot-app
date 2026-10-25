'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { DashboardBoardState } from '../_utils/board-types';

type PlotGridEmptyProps = {
  board: DashboardBoardState;
};

export function PlotGridEmpty({ board }: PlotGridEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-16 text-center">
      <p className="text-sm font-medium">No plots yet</p>
      <p className="text-xs text-muted-foreground">
        Add a plot to see your data on this dashboard.
      </p>
      <Button size="sm" onClick={board.openCreatePlot}>
        <PlusIcon />
        Add Plot
      </Button>
    </div>
  );
}
