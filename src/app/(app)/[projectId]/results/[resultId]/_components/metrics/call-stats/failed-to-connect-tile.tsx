'use client';

import { METRIC_TILE_CLASS } from '../../../_constants/result-detail';
import { useResultDetail } from '../../../_hooks/use-result-detail';
import { formatNumber } from '../../../_utils/number-format';

export function FailedToConnectTile() {
  const { callStats } = useResultDetail();

  return (
    <div className={METRIC_TILE_CLASS}>
      <span className="flex-1 font-medium">Failed to Connect</span>
      <span className="font-semibold tabular-nums">
        {formatNumber(callStats.failedToConnect)}
      </span>
    </div>
  );
}
