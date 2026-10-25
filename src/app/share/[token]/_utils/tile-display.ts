import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import { TileUnit } from '@/server/results/constants/tile-unit';
import type { ResultMetricTile } from '@/server/results/types';

import { EMPTY_VALUE, numberText } from './share-format';

const PERCENT = 100;

export const tilePercent = (tile: ResultMetricTile) => {
  if (tile.aggregate === null) return null;
  if (tile.unit === TileUnit.percent) return tile.aggregate;
  if (tile.unit === TileUnit.score) {
    return (tile.aggregate / RATING_SCALE_MAX) * PERCENT;
  }
  return null;
};

export const tileValueText = (tile: ResultMetricTile) => {
  if (tile.unit === TileUnit.text) return tile.text ?? EMPTY_VALUE;
  if (tile.aggregate === null) return EMPTY_VALUE;
  const percent = tilePercent(tile);
  if (percent !== null) return `${Math.round(percent)}%`;
  return numberText(tile.aggregate);
};

export const tileHasBar = (tile: ResultMetricTile) => {
  if (tile.unit === TileUnit.text) return false;
  if (tile.unit === TileUnit.value) return tile.aggregate === null;
  return true;
};

export const tileBarClass = (tile: ResultMetricTile) => {
  if (tile.passed) return 'bg-emerald-500';
  return 'bg-red-500';
};
