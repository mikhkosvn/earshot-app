import type { ResultMetricTile } from '@/server/results/types';

import { EMPTY_VALUE } from '../../../_constants/result-detail';

interface MetricPopupInfoProps {
  tile: ResultMetricTile;
}

export function MetricPopupInfo({ tile }: MetricPopupInfoProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-3">
      <h3 className="text-sm font-semibold">Description</h3>
      <p className="text-sm whitespace-pre-line text-muted-foreground">
        {tile.description}
      </p>
      <p className="text-sm text-muted-foreground">
        Threshold: {tile.thresholdText ?? EMPTY_VALUE}
      </p>
    </div>
  );
}
