'use client';

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { DraftActionType } from '../_constants/draft-action-type';
import type { DashboardBoardState } from '../_utils/board-types';
import { PlotGridEmpty } from './plot-grid-empty';
import { SortablePlot } from './sortable-plot';

type PlotGridProps = {
  board: DashboardBoardState;
};

const DRAG_DISTANCE = 5;

export function PlotGrid({ board }: PlotGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: DRAG_DISTANCE },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const { plots } = board.draft;

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    board.dispatch({
      type: DraftActionType.move,
      fromKey: String(active.id),
      toKey: String(over.id),
    });
  };

  if (plots.length === 0) return <PlotGridEmpty board={board} />;

  return (
    <DndContext
      id={`dashboard-${board.dashboardId}`}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={plots.map((plot) => plot.key)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {plots.map((plot) => (
            <SortablePlot key={plot.key} board={board} plot={plot} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
