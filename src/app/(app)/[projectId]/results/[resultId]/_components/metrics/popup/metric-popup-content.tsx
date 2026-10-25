'use client';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { ResultMetricTile } from '@/server/results/types';

import { hasOutcomeTabs } from '../../../_utils/metric-runs';
import { MetricOutcomeTabs } from './metric-outcome-tabs';
import { MetricPopupInfo } from './metric-popup-info';
import { MetricRunList } from './metric-run-list';

type MetricPopupContentProps = {
  tile: ResultMetricTile;
  onOpenRun: (runId: number) => void;
};

export function MetricPopupContent({
  tile,
  onOpenRun,
}: MetricPopupContentProps) {
  if (hasOutcomeTabs(tile)) {
    return <MetricOutcomeTabs tile={tile} onOpenRun={onOpenRun} />;
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>{tile.name}</DialogTitle>
      </DialogHeader>
      <MetricPopupInfo tile={tile} />
      <MetricRunList runs={tile.runs} onOpenRun={onOpenRun} />
    </>
  );
}
