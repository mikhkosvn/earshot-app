'use client';

import { useResultDetail } from '../../../_hooks/use-result-detail';
import { MetricGroup } from '../metric-group';
import { MetricTile } from './metric-tile';

export function RubricTilesGroup() {
  const { rubricTiles } = useResultDetail();
  if (rubricTiles.length === 0) return null;

  return (
    <MetricGroup label="Rubric">
      {rubricTiles.map((tile) => (
        <MetricTile key={tile.metricId} tile={tile} />
      ))}
    </MetricGroup>
  );
}
