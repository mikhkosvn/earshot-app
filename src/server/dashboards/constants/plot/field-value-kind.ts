import {
  DashboardSource,
  MetricEvalType,
  WidgetField,
} from '@/generated/prisma/enums';

import { MetadataFieldType } from './metadata-field-type';
import { PlotAggregation } from './plot-aggregation';
import { PlotDisplayType } from './plot-display-type';

export const FieldValueKind = {
  numeric: 'numeric',
  boolean: 'boolean',
  category: 'category',
} as const;

export type FieldValueKind =
  (typeof FieldValueKind)[keyof typeof FieldValueKind];

interface FieldKindInput {
  field: WidgetField;
  metricEvalType: MetricEvalType | null;
  metadataFieldType: MetadataFieldType | null;
}

const metricKind = (evalType: MetricEvalType | null): FieldValueKind => {
  if (evalType === MetricEvalType.binary) return FieldValueKind.boolean;
  if (evalType === MetricEvalType.enum) return FieldValueKind.category;
  return FieldValueKind.numeric;
};

const metadataKind = (type: MetadataFieldType | null): FieldValueKind => {
  if (type === MetadataFieldType.number) return FieldValueKind.numeric;
  return FieldValueKind.category;
};

const FIXED_FIELD_KIND: Partial<Record<WidgetField, FieldValueKind>> = {
  [WidgetField.success]: FieldValueKind.boolean,
  [WidgetField.is_reviewed]: FieldValueKind.boolean,
  [WidgetField.duration]: FieldValueKind.numeric,
  [WidgetField.call_ended_reason]: FieldValueKind.category,
  [WidgetField.dropoff_point]: FieldValueKind.category,
  [WidgetField.topic]: FieldValueKind.category,
  [WidgetField.scenario_name]: FieldValueKind.category,
};

export const fieldValueKind = ({
  field,
  metricEvalType,
  metadataFieldType,
}: FieldKindInput): FieldValueKind => {
  if (field === WidgetField.metric_value) return metricKind(metricEvalType);
  if (field === WidgetField.metadata) return metadataKind(metadataFieldType);
  return FIXED_FIELD_KIND[field] ?? FieldValueKind.numeric;
};

export const KIND_DISPLAY_TYPES: Record<FieldValueKind, PlotDisplayType[]> = {
  [FieldValueKind.numeric]: [
    PlotDisplayType.line,
    PlotDisplayType.bar,
    PlotDisplayType.scatter,
  ],
  [FieldValueKind.boolean]: [
    PlotDisplayType.bar,
    PlotDisplayType.pie,
    PlotDisplayType.list,
  ],
  [FieldValueKind.category]: [PlotDisplayType.pie, PlotDisplayType.list],
};

export const KIND_DEFAULT_DISPLAY_TYPE: Record<
  FieldValueKind,
  PlotDisplayType
> = {
  [FieldValueKind.numeric]: PlotDisplayType.line,
  [FieldValueKind.boolean]: PlotDisplayType.pie,
  [FieldValueKind.category]: PlotDisplayType.pie,
};

const NUMERIC_AGGREGATIONS: PlotAggregation[] = [
  PlotAggregation.count,
  PlotAggregation.sum,
  PlotAggregation.avg,
  PlotAggregation.min,
  PlotAggregation.max,
  PlotAggregation.p50,
  PlotAggregation.p95,
  PlotAggregation.p99,
];

const BOOLEAN_AGGREGATIONS: PlotAggregation[] = [
  PlotAggregation.count,
  PlotAggregation.percentage,
];

export const allowedAggregations = (
  kind: FieldValueKind,
  isRating: boolean,
): PlotAggregation[] => {
  if (kind === FieldValueKind.boolean) return BOOLEAN_AGGREGATIONS;
  if (isRating) return [...NUMERIC_AGGREGATIONS, PlotAggregation.percentage];
  return NUMERIC_AGGREGATIONS;
};

export const defaultAggregation = (kind: FieldValueKind): PlotAggregation => {
  if (kind === FieldValueKind.boolean) return PlotAggregation.count;
  return PlotAggregation.avg;
};

export const SOURCE_FIELDS: Record<DashboardSource, WidgetField[]> = {
  [DashboardSource.call_logs]: [
    WidgetField.duration,
    WidgetField.success,
    WidgetField.is_reviewed,
    WidgetField.call_ended_reason,
    WidgetField.dropoff_point,
    WidgetField.topic,
    WidgetField.metric_value,
    WidgetField.metadata,
  ],
  [DashboardSource.runs]: [
    WidgetField.duration,
    WidgetField.success,
    WidgetField.is_reviewed,
    WidgetField.call_ended_reason,
    WidgetField.scenario_name,
    WidgetField.metric_value,
    WidgetField.metadata,
  ],
};
