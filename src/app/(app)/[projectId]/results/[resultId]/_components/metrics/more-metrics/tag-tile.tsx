import type { ResultTagTile } from '@/server/results/types';

import { METRIC_TILE_CLASS } from '../../../_constants/result-detail';
import { formatPercent } from '../../../_utils/number-format';
import { PercentBar } from '../../percent-bar';

type TagTileProps = {
  tile: ResultTagTile;
};

export function TagTile({ tile }: TagTileProps) {
  return (
    <div className={METRIC_TILE_CLASS}>
      <span className="min-w-0 flex-1 truncate font-medium">{tile.tag}</span>
      <span className="font-semibold tabular-nums">
        {formatPercent(tile.successRate)}
      </span>
      <PercentBar percent={tile.successRate} />
    </div>
  );
}
