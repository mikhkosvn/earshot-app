'use client';

import { useResultDetail } from '../../../_hooks/use-result-detail';
import { MetricGroup } from '../metric-group';
import { TagTile } from './tag-tile';

export function TagTilesGroup() {
  const { tagTiles } = useResultDetail();
  if (tagTiles.length === 0) return null;

  return (
    <MetricGroup label="Tags">
      {tagTiles.map((tile) => (
        <TagTile key={tile.tag} tile={tile} />
      ))}
    </MetricGroup>
  );
}
