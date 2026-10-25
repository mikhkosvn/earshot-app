'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { PlotDialogMode } from '../_constants/draft-action-type';
import type { PlotDialogState } from '../_hooks/use-dashboard-board';
import type { DashboardBoardState } from '../_utils/board-types';
import { PlotDialogBody } from './plot-dialog-body';
import { PlotDialogHeading } from './plot-dialog-heading';

type PlotDialogProps = {
  board: DashboardBoardState;
  state: PlotDialogState;
  onClose: () => void;
};

export function PlotDialog({ board, state, onClose }: PlotDialogProps) {
  return (
    <Dialog
      open={state.mode !== PlotDialogMode.closed}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="gap-1 border-b px-4 py-3">
          <PlotDialogHeading state={state} />
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-64" />}>
            <PlotDialogBody board={board} state={state} onClose={onClose} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
