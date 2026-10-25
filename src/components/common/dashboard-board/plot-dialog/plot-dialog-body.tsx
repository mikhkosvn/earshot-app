'use client';

import { PlotDialogMode } from '../_constants/draft-action-type';
import type { PlotDialogState } from '../_hooks/use-dashboard-board';
import type { DashboardBoardState } from '../_utils/board-types';
import { PlotForm } from './plot-form';
import { QuickAddList } from './quick-add/quick-add-list';

interface PlotDialogBodyProps {
  board: DashboardBoardState;
  state: PlotDialogState;
  onClose: () => void;
}

export function PlotDialogBody({ board, state, onClose }: PlotDialogBodyProps) {
  if (state.mode === PlotDialogMode.closed) return null;

  if (state.mode === PlotDialogMode.create) {
    return (
      <PlotForm
        board={board}
        target={null}
        submitLabel="Create Plot"
        onDone={onClose}
      >
        <QuickAddList board={board} onDone={onClose} />
      </PlotForm>
    );
  }

  const plot = board.draft.plots.find((item) => item.key === state.key);
  if (!plot) return null;

  return (
    <PlotForm
      board={board}
      target={{ key: plot.key, config: plot.config }}
      submitLabel="Save Plot"
      onDone={onClose}
    />
  );
}
