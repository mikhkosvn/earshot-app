'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { MetricGroup } from '../../_constants/metric-group';
import { useMetricDragEnd } from '../../_hooks/use-metric-drag-end';
import type { MetricSelection } from '../metrics-view';
import { MetricGroupSection } from './metric-group-section';
import { MetricsTableHeader } from './metrics-table-header';

const DRAG_ACTIVATION_DISTANCE = 4;

export function MetricsTable({
  selectedIds,
  onSelectedIdsChange,
}: MetricSelection) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: DRAG_ACTIVATION_DISTANCE },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const onDragEnd = useMetricDragEnd();

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <div className="min-w-275">
        <MetricsTableHeader
          selectedIds={selectedIds}
          onSelectedIdsChange={onSelectedIdsChange}
        />
        <DndContext
          id="metrics-table"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          {Object.values(MetricGroup).map((group) => (
            <MetricGroupSection
              key={group}
              group={group}
              selectedIds={selectedIds}
              onSelectedIdsChange={onSelectedIdsChange}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
