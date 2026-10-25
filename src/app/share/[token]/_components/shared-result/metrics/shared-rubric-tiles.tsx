'use client';

import { useSharedResult } from '../../../_hooks/use-shared-result';
import { SharedRubricTile } from './shared-rubric-tile';

export function SharedRubricTiles() {
  const { rubricTiles } = useSharedResult();

  if (rubricTiles.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        No rubric metrics on this result.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
      {rubricTiles.map((tile) => (
        <SharedRubricTile key={tile.metricId} tile={tile} />
      ))}
    </div>
  );
}
