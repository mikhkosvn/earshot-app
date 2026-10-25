import 'server-only';

import { PlotDataKind } from '@/server/dashboards/constants/plot/plot-data-kind';
import type {
  BucketPlotData,
  PlotData,
  PointPlotData,
  SlicePlotData,
  StatPlotData,
} from '@/server/dashboards/types';

const NO_DATA = 'No data available';

const MAX_ITEMS = 6;

const unitOf = (percent: boolean) => {
  if (percent) return '%';
  return '';
};

const statSummary = (data: StatPlotData) =>
  data.cells
    .map((cell) => {
      if (cell.unit) return `${cell.label} ${cell.value} ${cell.unit}`;
      return `${cell.label} ${cell.value}`;
    })
    .join(', ');

const bucketSummary = (data: BucketPlotData) => {
  if (data.rows.length === 0) return NO_DATA;
  const unit = unitOf(data.percent);
  return data.rows
    .slice(-MAX_ITEMS)
    .map((row) => {
      const values = data.series.flatMap((series) => {
        const value = row.values[series.key];
        if (value === null || value === undefined) return [];
        if (data.series.length === 1) return [`${value}${unit}`];
        return [`${series.label} ${value}${unit}`];
      });
      return `${row.label}: ${values.join(' / ')}`;
    })
    .join(', ');
};

const pointSummary = (data: PointPlotData) => {
  if (data.points.length === 0) return NO_DATA;
  const values = data.points.map((point) => point.value);
  const average =
    values.reduce((total, value) => total + value, 0) / values.length;
  return `${values.length} values, average ${Math.round(average * 100) / 100}, minimum ${Math.min(...values)}, maximum ${Math.max(...values)}`;
};

const sliceSummary = (data: SlicePlotData) => {
  if (data.slices.length === 0) return NO_DATA;
  return data.slices
    .slice(0, MAX_ITEMS)
    .map((slice) => `${slice.label} ${slice.value} (${slice.percentage}%)`)
    .join(', ');
};

export const summarizePlot = (data: PlotData) => {
  switch (data.kind) {
    case PlotDataKind.stat:
      return statSummary(data);
    case PlotDataKind.buckets:
      return bucketSummary(data);
    case PlotDataKind.points:
      return pointSummary(data);
    default:
      return sliceSummary(data);
  }
};
