import 'server-only';

import { WidgetField } from '@/generated/prisma/enums';
import { FieldValueKind } from '@/server/dashboards/constants/plot/field-value-kind';
import { MetadataFieldType } from '@/server/dashboards/constants/plot/metadata-field-type';
import { PlotAggregation } from '@/server/dashboards/constants/plot/plot-aggregation';
import { WidgetGroupBy } from '@/server/dashboards/constants/plot/widget-group-by';
import type { PlotConfig } from '@/server/dashboards/types';
import type { MetricValue } from '@/server/dashboards/utils/records/load-metric-values';
import type { PlotRecord } from '@/server/dashboards/utils/records/load-plot-records';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';

import type { FieldContext } from './field-context';

export type RawValue = number | boolean | string | null;

const UNKNOWN_GROUP = 'Unknown';

const toNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() !== '') {
    const number = Number(value);
    if (Number.isFinite(number)) return number;
  }
  return null;
};

const toText = (value: unknown) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const metadataValue = (value: unknown, type: MetadataFieldType | null) => {
  if (type === MetadataFieldType.number) return toNumber(value);
  return toText(value);
};

const metricRaw = (value: MetricValue | undefined, kind: FieldValueKind) => {
  if (!value) return null;
  if (kind === FieldValueKind.boolean) return value.boolean;
  if (kind === FieldValueKind.numeric) return value.number;
  return value.text ?? toText(value.boolean) ?? toText(value.number);
};

const durationMinutes = (seconds: number | null) => {
  if (seconds === null) return null;
  return seconds / 60;
};

export const rawValueOf = (
  record: PlotRecord,
  config: PlotConfig,
  context: FieldContext,
): RawValue => {
  switch (config.field) {
    case WidgetField.success:
      return record.success;
    case WidgetField.is_reviewed:
      return record.reviewed;
    case WidgetField.duration:
      return durationMinutes(record.durationSeconds);
    case WidgetField.call_ended_reason:
      return record.endedReason;
    case WidgetField.scenario_name:
      return record.scenarioName;
    case WidgetField.metadata:
      return metadataValue(
        record.metadata[config.metadataKey ?? ''],
        config.metadataFieldType,
      );
    default:
      return metricRaw(context.values.get(record.conversationId), context.kind);
  }
};

export const numericValueOf = (
  raw: RawValue,
  config: PlotConfig,
  context: FieldContext,
) => {
  if (typeof raw === 'boolean') return Number(raw);
  if (typeof raw !== 'number') return null;
  if (context.isRating && config.aggregation === PlotAggregation.percentage) {
    return (raw / RATING_SCALE_MAX) * 100;
  }
  return raw;
};

const booleanLabel = (value: boolean) => {
  if (value) return 'True';
  return 'False';
};

export const categoryLabelOf = (raw: RawValue) => {
  if (raw === null || raw === '') return null;
  if (typeof raw === 'boolean') return booleanLabel(raw);
  if (typeof raw === 'number') return String(Math.round(raw * 100) / 100);
  return raw;
};

const durationGroup = (seconds: number | null) => {
  if (seconds === null) return UNKNOWN_GROUP;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}-${minutes + 1} min`;
};

const successGroup = (success: boolean | null) => {
  if (success === null) return UNKNOWN_GROUP;
  if (success) return 'Success';
  return 'Failure';
};

const reviewedGroup = (reviewed: boolean) => {
  if (reviewed) return 'Reviewed';
  return 'Not reviewed';
};

export const groupKeyOf = (
  record: PlotRecord,
  config: PlotConfig,
  context: FieldContext,
) => {
  switch (config.groupBy) {
    case WidgetGroupBy.success:
      return successGroup(record.success);
    case WidgetGroupBy.is_reviewed:
      return reviewedGroup(record.reviewed);
    case WidgetGroupBy.duration:
      return durationGroup(record.durationSeconds);
    case WidgetGroupBy.call_ended_reason:
      return record.endedReason ?? UNKNOWN_GROUP;
    case WidgetGroupBy.agent:
      return record.agentName ?? UNKNOWN_GROUP;
    case WidgetGroupBy.metadata:
      return (
        toText(record.metadata[config.groupByMetadataKey ?? '']) ??
        UNKNOWN_GROUP
      );
    default:
      return (
        context.groupValues.get(record.conversationId)?.text ?? UNKNOWN_GROUP
      );
  }
};
