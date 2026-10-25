'use client';

import { Maximize2Icon, RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useRefreshPlot } from '../../_hooks/use-refresh-plot';
import type { DashboardBoardState } from '../../_utils/board-types';
import type { DraftPlot } from '../../_utils/dashboard-draft';
import { PlotExpandDialog } from './plot-expand-dialog';

type PlotHeaderActionsProps = {
  board: DashboardBoardState;
  plot: DraftPlot;
};

export function PlotHeaderActions({ board, plot }: PlotHeaderActionsProps) {
  const [expanded, setExpanded] = useState(false);
  const refresh = useRefreshPlot(board, plot.config);

  if (plot.isNew) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Expand ${plot.config.name}`}
        onClick={() => setExpanded(true)}
      >
        <Maximize2Icon />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Refresh ${plot.config.name}`}
        onClick={() => {
          void refresh();
        }}
      >
        <RefreshCwIcon />
      </Button>
      <PlotExpandDialog
        board={board}
        plot={plot}
        open={expanded}
        onOpenChange={setExpanded}
      />
    </>
  );
}
