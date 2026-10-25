import { cn } from '@/lib/utils';
import type { ResultMetricTile } from '@/server/results/types';

import {
  tileBarClass,
  tileHasBar,
  tilePercent,
} from '../../../_utils/tile-display';

interface SharedTileBarProps {
  tile: ResultMetricTile;
}

export function SharedTileBar({ tile }: SharedTileBarProps) {
  if (!tileHasBar(tile)) return null;

  return (
    <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-muted">
      <div
        className={cn('h-full rounded-full', tileBarClass(tile))}
        style={{ width: `${tilePercent(tile) ?? 0}%` }}
      />
    </div>
  );
}
