'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { DashboardBoardState } from '../../_utils/board-types';
import type { DraftPlot } from '../../_utils/dashboard-draft';
import { PlotBody } from '../../charts/plot-body';
import { PlotIcon } from './plot-icon';

interface PlotExpandDialogProps {
  board: DashboardBoardState;
  plot: DraftPlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlotExpandDialog({
  board,
  plot,
  open,
  onOpenChange,
}: PlotExpandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(42rem,85vh)] flex-col gap-3 sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <PlotIcon
              displayType={plot.config.displayType}
              className="size-4 text-muted-foreground"
            />
            {plot.config.name}
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1 rounded-lg border">
          <PlotBody board={board} config={plot.config} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
