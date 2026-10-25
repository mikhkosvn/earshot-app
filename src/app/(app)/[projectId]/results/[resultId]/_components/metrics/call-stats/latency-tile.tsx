'use client';

import { METRIC_TILE_CLASS } from '../../../_constants/result-detail';
import { useResultDetail } from '../../../_hooks/use-result-detail';
import { formatWithUnit } from '../../../_utils/number-format';
import { PercentileStat } from './percentile-stat';

export function LatencyTile() {
  const { latency } = useResultDetail().callStats;

  return (
    <div className={METRIC_TILE_CLASS}>
      <span className="min-w-0 flex-1 truncate font-medium">Latency</span>
      <span className="flex items-center gap-2">
        <PercentileStat label="P50" value={latency?.p50} />
        <PercentileStat label="P95" value={latency?.p95} />
        <PercentileStat label="P99" value={latency?.p99} />
      </span>
      <span className="border-l pl-3 font-semibold whitespace-nowrap tabular-nums">
        {formatWithUnit(latency?.mean, 'ms')}
      </span>
    </div>
  );
}
