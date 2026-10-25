'use client';

import { NumericTilesGroup } from '../tiles/numeric-tiles-group';
import { TagTilesGroup } from './tag-tiles-group';

interface MoreMetricsGroupsProps {
  open: boolean;
}

export function MoreMetricsGroups({ open }: MoreMetricsGroupsProps) {
  if (!open) return null;

  return (
    <>
      <NumericTilesGroup />
      <TagTilesGroup />
    </>
  );
}
