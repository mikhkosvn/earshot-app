import type { ChartConfig } from '@/components/ui/chart';
import {
  PLOT_COLOR_VALUE,
  type PlotColor,
  SERIES_COLORS,
} from '@/server/dashboards/constants/plot/plot-color';
import type { PlotSeries } from '@/server/dashboards/types';

const compactFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const formatAxisValue = (value: number, percent: boolean) => {
  if (percent) return `${value.toFixed(1)}%`;
  return compactFormatter.format(value);
};

const seriesColor = (index: number, count: number, color: PlotColor) => {
  if (count === 1) return PLOT_COLOR_VALUE[color];
  return SERIES_COLORS[index % SERIES_COLORS.length];
};

export const seriesChartConfig = (
  series: readonly PlotSeries[],
  color: PlotColor,
): ChartConfig =>
  Object.fromEntries(
    series.map((item, index) => [
      item.key,
      { label: item.label, color: seriesColor(index, series.length, color) },
    ]),
  );

export const sliceColor = (index: number, color: PlotColor) => {
  if (index === 0) return PLOT_COLOR_VALUE[color];
  return SERIES_COLORS[index % SERIES_COLORS.length];
};

export const changeText = (change: number | null) => {
  if (change === null) return '—';
  if (change > 0) return `+${change}%`;
  return `${change}%`;
};
