'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { PlotDisplayType } from '@/server/dashboards/constants/plot/plot-display-type';

import type { DashboardBoardState } from '../_utils/board-types';
import type { DraftPlot } from '../_utils/dashboard-draft';
import { PlotDragHandle } from './plot-drag-handle';
import { PlotFrame } from './plot-frame';

type SortablePlotProps = {
  board: DashboardBoardState;
  plot: DraftPlot;
};

export function SortablePlot({ board, plot }: SortablePlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: plot.key });
  const isStat = plot.config.displayType === PlotDisplayType.stat;
  const dragHandle = (
    <PlotDragHandle
      ref={setActivatorNodeRef}
      plotName={plot.config.name}
      {...attributes}
      {...listeners}
    />
  );

  return (
    <div
      ref={setNodeRef}
      data-dragging={isDragging}
      data-stat={isStat}
      className="data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 data-[stat=true]:col-span-full"
      style={{ transform: CSS.Translate.toString(transform), transition }}
    >
      <PlotFrame board={board} plot={plot} dragHandle={dragHandle} />
    </div>
  );
}
