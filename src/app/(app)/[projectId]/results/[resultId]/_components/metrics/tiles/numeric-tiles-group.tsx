'use client';

import { useResultDetail } from '../../../_hooks/use-result-detail';
import { MetricGroup } from '../metric-group';
import { MetricTile } from './metric-tile';

export function NumericTilesGroup() {
  const { otherTiles } = useResultDetail();
  if (otherTiles.length === 0) return null;

  return (
    <MetricGroup label="Numeric">
      {otherTiles.map((tile) => (
        <MetricTile key={tile.metricId} tile={tile} />
      ))}
    </MetricGroup>
  );
}
