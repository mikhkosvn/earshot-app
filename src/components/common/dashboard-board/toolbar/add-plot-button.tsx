'use client';

import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import type { DashboardBoardState } from '../_utils/board-types';

interface AddPlotButtonProps {
  board: DashboardBoardState;
}

export function AddPlotButton({ board }: AddPlotButtonProps) {
  return (
    <Button size="sm" onClick={board.openCreatePlot}>
      <PlusIcon />
      Add Plot
    </Button>
  );
}
