import { ChartType } from '@/generated/prisma/enums';

export const PlotDisplayType = {
  line: 'line',
  bar: 'bar',
  scatter: 'scatter',
  pie: 'pie',
  list: 'list',
  stat: 'stat',
} as const;

export type PlotDisplayType =
  (typeof PlotDisplayType)[keyof typeof PlotDisplayType];

export const DISPLAY_CHART_TYPE: Record<PlotDisplayType, ChartType> = {
  [PlotDisplayType.line]: ChartType.line,
  [PlotDisplayType.bar]: ChartType.bar,
  [PlotDisplayType.scatter]: ChartType.line,
  [PlotDisplayType.pie]: ChartType.pie,
  [PlotDisplayType.list]: ChartType.pie,
  [PlotDisplayType.stat]: ChartType.stat,
};

export const CHART_DISPLAY_TYPES: PlotDisplayType[] = [
  PlotDisplayType.line,
  PlotDisplayType.bar,
  PlotDisplayType.scatter,
  PlotDisplayType.pie,
  PlotDisplayType.list,
];

export const TIME_SERIES_DISPLAY_TYPES: PlotDisplayType[] = [
  PlotDisplayType.line,
  PlotDisplayType.bar,
];

export const SLICE_DISPLAY_TYPES: PlotDisplayType[] = [
  PlotDisplayType.pie,
  PlotDisplayType.list,
];
