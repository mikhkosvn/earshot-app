import type { ResultMetricTile } from '@/server/results/types';

import { showsTileBar, tilePercent } from '../../../_utils/tile-format';
import { PercentBar } from '../../percent-bar';

type MetricTileBarProps = {
  tile: ResultMetricTile;
};

export function MetricTileBar({ tile }: MetricTileBarProps) {
  if (!showsTileBar(tile)) return null;

  return <PercentBar percent={tilePercent(tile) ?? 0} />;
}
