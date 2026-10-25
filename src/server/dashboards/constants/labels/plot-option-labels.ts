import { WidgetTimePeriod } from '@/generated/prisma/enums';

import { MetadataFieldType } from '../plot/metadata-field-type';
import { PlotAggregation } from '../plot/plot-aggregation';
import { PlotDisplayType } from '../plot/plot-display-type';
import { PlotOutcome } from '../plot/plot-outcome';
import { WidgetGroupBy } from '../plot/widget-group-by';

export const PlotAggregationLabel: Record<PlotAggregation, string> = {
  [PlotAggregation.count]: 'Count',
  [PlotAggregation.sum]: 'Sum',
  [PlotAggregation.avg]: 'Average',
  [PlotAggregation.min]: 'Minimum',
  [PlotAggregation.max]: 'Maximum',
  [PlotAggregation.percentage]: 'Percentage',
  [PlotAggregation.p50]: 'p50 (Median)',
  [PlotAggregation.p95]: 'p95 (95th Percentile)',
  [PlotAggregation.p99]: 'p99 (99th Percentile)',
};

export const PlotAggregationShortLabel: Record<PlotAggregation, string> = {
  [PlotAggregation.count]: 'Count',
  [PlotAggregation.sum]: 'Sum',
  [PlotAggregation.avg]: 'Avg',
  [PlotAggregation.min]: 'Min',
  [PlotAggregation.max]: 'Max',
  [PlotAggregation.percentage]: 'Percentage',
  [PlotAggregation.p50]: 'P50',
  [PlotAggregation.p95]: 'P95',
  [PlotAggregation.p99]: 'P99',
};

export const PlotTimePeriodLabel: Record<WidgetTimePeriod, string> = {
  [WidgetTimePeriod.hour]: 'Hourly',
  [WidgetTimePeriod.day]: 'Daily',
  [WidgetTimePeriod.week]: 'Weekly',
  [WidgetTimePeriod.month]: 'Monthly',
};

export const PlotDisplayTypeLabel: Record<PlotDisplayType, string> = {
  [PlotDisplayType.line]: 'Line',
  [PlotDisplayType.bar]: 'Bar',
  [PlotDisplayType.scatter]: 'Scatter',
  [PlotDisplayType.pie]: 'Pie',
  [PlotDisplayType.list]: 'List',
  [PlotDisplayType.stat]: 'Stat',
};

export const PlotDisplayTypeAriaLabel: Record<PlotDisplayType, string> = {
  [PlotDisplayType.line]: 'Line Chart',
  [PlotDisplayType.bar]: 'Bar Chart',
  [PlotDisplayType.scatter]: 'Scatter Plot',
  [PlotDisplayType.pie]: 'Pie Chart',
  [PlotDisplayType.list]: 'List',
  [PlotDisplayType.stat]: 'Stat',
};

export const WidgetGroupByLabel: Record<WidgetGroupBy, string> = {
  [WidgetGroupBy.none]: 'None',
  [WidgetGroupBy.success]: 'Success',
  [WidgetGroupBy.is_reviewed]: 'Is Reviewed',
  [WidgetGroupBy.duration]: 'Duration',
  [WidgetGroupBy.call_ended_reason]: 'Call Ended Reason',
  [WidgetGroupBy.topic]: 'Topic',
  [WidgetGroupBy.dropoff_point]: 'Drop-off Point',
  [WidgetGroupBy.agent]: 'Agent',
  [WidgetGroupBy.metadata]: 'Metadata Key',
};

export const MetadataFieldTypeLabel: Record<MetadataFieldType, string> = {
  [MetadataFieldType.string]: 'String',
  [MetadataFieldType.number]: 'Number',
  [MetadataFieldType.boolean]: 'Boolean',
};

export const PlotOutcomeLabel: Record<PlotOutcome, string> = {
  [PlotOutcome.all]: 'All',
  [PlotOutcome.success]: 'Success only',
  [PlotOutcome.failure]: 'Failure only',
};
