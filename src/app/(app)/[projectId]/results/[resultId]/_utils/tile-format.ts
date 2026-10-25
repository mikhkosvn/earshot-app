import { TileUnit } from '@/server/results/constants/tile-unit';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';
import type { ResultMetricTile } from '@/server/results/types';

import { EMPTY_VALUE, PERCENT_SCALE } from '../_constants/result-detail';
import { formatNumber, formatPercent } from './number-format';

type TileAmount = Pick<ResultMetricTile, 'unit' | 'aggregate' | 'text'>;

export const tilePercent = (tile: TileAmount) => {
  if (tile.aggregate === null) return null;
  if (tile.unit === TileUnit.percent) return tile.aggregate;
  if (tile.unit === TileUnit.score) {
    return (tile.aggregate / RATING_SCALE_MAX) * PERCENT_SCALE;
  }
  return null;
};

export const tileValueText = (tile: TileAmount) => {
  if (tile.unit === TileUnit.text) return tile.text ?? EMPTY_VALUE;
  if (tile.aggregate === null) return EMPTY_VALUE;
  const percent = tilePercent(tile);
  if (percent !== null) return formatPercent(percent);
  return formatNumber(tile.aggregate);
};

export const showsTileBar = (tile: TileAmount) => {
  if (tile.unit === TileUnit.text) return false;
  if (tile.aggregate === null) return true;
  return tilePercent(tile) !== null;
};
