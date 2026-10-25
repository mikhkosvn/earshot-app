'use client';

import { METRIC_TILE_CLASS } from '../../../_constants/result-detail';
import { useResultDetail } from '../../../_hooks/use-result-detail';
import { formatWithUnit } from '../../../_utils/number-format';
import { PercentileStat } from './percentile-stat';

export function RingingTile() {
  const { ringing } = useResultDetail().callStats;

  return (
    <div className={METRIC_TILE_CLASS}>
      <span className="flex-1 font-medium">Avg Ringing Duration</span>
      <PercentileStat label="P50" value={ringing?.p50} />
      <span className="border-l pl-3 font-semibold whitespace-nowrap tabular-nums">
        {formatWithUnit(ringing?.mean, 's')}
      </span>
    </div>
  );
}
