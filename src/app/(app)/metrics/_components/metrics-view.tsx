'use client';

import { useState } from 'react';

import { GeneratedMetricsDialog } from './generated/generated-metrics-dialog';
import { MetricsTable } from './table/metrics-table';
import { MetricsToolbar } from './toolbar/metrics-toolbar';

export type MetricSelection = {
  selectedIds: number[];
  onSelectedIdsChange: (ids: number[]) => void;
};

export function MetricsView() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <MetricsToolbar
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
      />
      <MetricsTable
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
      />
      <GeneratedMetricsDialog />
    </div>
  );
}
