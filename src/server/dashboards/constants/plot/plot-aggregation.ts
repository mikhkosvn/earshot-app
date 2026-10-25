import { WidgetAggregation } from '@/generated/prisma/enums';

export const PlotAggregation = {
  count: 'count',
  sum: 'sum',
  avg: 'avg',
  min: 'min',
  max: 'max',
  percentage: 'percentage',
  p50: 'p50',
  p95: 'p95',
  p99: 'p99',
} as const;

export type PlotAggregation =
  (typeof PlotAggregation)[keyof typeof PlotAggregation];

export const AggregationDisplay = {
  count: 'count',
  percentage: 'percentage',
} as const;

export type AggregationDisplay =
  (typeof AggregationDisplay)[keyof typeof AggregationDisplay];

export const STORED_AGGREGATION: Record<PlotAggregation, WidgetAggregation> = {
  [PlotAggregation.count]: WidgetAggregation.count,
  [PlotAggregation.sum]: WidgetAggregation.sum,
  [PlotAggregation.avg]: WidgetAggregation.avg,
  [PlotAggregation.min]: WidgetAggregation.min,
  [PlotAggregation.max]: WidgetAggregation.max,
  [PlotAggregation.percentage]: WidgetAggregation.avg,
  [PlotAggregation.p50]: WidgetAggregation.p50,
  [PlotAggregation.p95]: WidgetAggregation.p95,
  [PlotAggregation.p99]: WidgetAggregation.p99,
};
