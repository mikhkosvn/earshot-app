import { WidgetAggregation } from '@/generated/prisma/enums';

export const WidgetAggregationLabel: Record<WidgetAggregation, string> = {
  [WidgetAggregation.count]: 'Count',
  [WidgetAggregation.sum]: 'Sum',
  [WidgetAggregation.avg]: 'Average',
  [WidgetAggregation.min]: 'Minimum',
  [WidgetAggregation.max]: 'Maximum',
  [WidgetAggregation.p50]: '50th Percentile (Median)',
  [WidgetAggregation.p95]: '95th Percentile',
  [WidgetAggregation.p99]: '99th Percentile',
};
