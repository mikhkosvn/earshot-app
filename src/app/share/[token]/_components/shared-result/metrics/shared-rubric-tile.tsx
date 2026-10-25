import type { ResultMetricTile } from '@/server/results/types';

import { tileValueText } from '../../../_utils/tile-display';
import { SharedTileBar } from './shared-tile-bar';

type SharedRubricTileProps = {
  tile: ResultMetricTile;
};

export function SharedRubricTile({ tile }: SharedRubricTileProps) {
  return (
    <div className="flex items-center gap-3 rounded-md border px-3 py-2 text-sm">
      <span className="min-w-0 flex-1 truncate font-medium">{tile.name}</span>
      <span className="font-medium tabular-nums">{tileValueText(tile)}</span>
      <SharedTileBar tile={tile} />
    </div>
  );
}
