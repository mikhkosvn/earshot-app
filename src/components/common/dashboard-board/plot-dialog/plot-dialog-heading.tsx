'use client';

import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

import { PlotDialogMode } from '../_constants/draft-action-type';
import type { PlotDialogState } from '../_hooks/use-dashboard-board';

type PlotDialogHeadingProps = {
  state: PlotDialogState;
};

export function PlotDialogHeading({ state }: PlotDialogHeadingProps) {
  if (state.mode === PlotDialogMode.edit) {
    return (
      <>
        <DialogTitle>Edit Plot</DialogTitle>
        <DialogDescription>
          Change the chart plot on your dashboard
        </DialogDescription>
      </>
    );
  }
  return (
    <>
      <DialogTitle>Create Plot</DialogTitle>
      <DialogDescription>
        Add a new chart plot to your dashboard
      </DialogDescription>
    </>
  );
}
