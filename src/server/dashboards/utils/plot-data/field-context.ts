import 'server-only';

import { MetricEvalType, WidgetField } from '@/generated/prisma/enums';
import { WidgetFieldDisplayLabel } from '@/server/dashboards/constants/labels/widget-field-display-labels';
import { MetricFunction } from '@/server/dashboards/constants/metric-function';
import {
  fieldValueKind,
  type FieldValueKind,
} from '@/server/dashboards/constants/plot/field-value-kind';
import { WidgetGroupBy } from '@/server/dashboards/constants/plot/widget-group-by';
import type { PlotConfig } from '@/server/dashboards/types';
import {
  findPlotMetric,
  metricIdsByFunction,
} from '@/server/dashboards/utils/project-metrics';
import {
  loadMetricValues,
  type MetricValue,
} from '@/server/dashboards/utils/records/load-metric-values';
import type { PlotRecord } from '@/server/dashboards/utils/records/load-plot-records';

export type FieldContext = {
  kind: FieldValueKind;
  isRating: boolean;
  displayName: string;
  values: Map<number, MetricValue>;
  groupValues: Map<number, MetricValue>;
};

type MetricRef = {
  id: number;
  name: string;
  evalType: MetricEvalType;
} | null;

const FUNCTION_FIELDS: Partial<Record<WidgetField, MetricFunction>> = {
  [WidgetField.topic]: MetricFunction.topic,
  [WidgetField.dropoff_point]: MetricFunction.dropoff,
};

const FUNCTION_GROUPS: Partial<Record<WidgetGroupBy, MetricFunction>> = {
  [WidgetGroupBy.topic]: MetricFunction.topic,
  [WidgetGroupBy.dropoff_point]: MetricFunction.dropoff,
};

const fieldMetricId = (
  config: PlotConfig,
  functionIds: Map<string, number>,
) => {
  if (config.field === WidgetField.metric_value) return config.metricId;
  const functionName = FUNCTION_FIELDS[config.field];
  if (!functionName) return null;
  return functionIds.get(functionName) ?? null;
};

const groupMetricId = (
  config: PlotConfig,
  functionIds: Map<string, number>,
) => {
  const functionName = FUNCTION_GROUPS[config.groupBy];
  if (!functionName) return null;
  return functionIds.get(functionName) ?? null;
};

const valuesOf = (metricId: number | null, conversationIds: number[]) => {
  if (metricId === null) {
    return Promise.resolve(new Map<number, MetricValue>());
  }
  return loadMetricValues(metricId, conversationIds);
};

const displayNameOf = (config: PlotConfig, metric: MetricRef) => {
  if (config.field === WidgetField.metric_value) {
    return metric?.name ?? 'Metric';
  }
  if (config.field === WidgetField.metadata) return config.metadataKey ?? '';
  return WidgetFieldDisplayLabel[config.field];
};

const metricOf = async (projectId: number, config: PlotConfig) => {
  if (config.field !== WidgetField.metric_value || config.metricId === null) {
    return null;
  }
  return findPlotMetric(projectId, config.metricId);
};

export const loadFieldContext = async (
  projectId: number,
  config: PlotConfig,
  records: PlotRecord[],
): Promise<FieldContext> => {
  const functionIds = await metricIdsByFunction(projectId);
  const metric = await metricOf(projectId, config);
  const conversationIds = records.map((record) => record.conversationId);
  const [values, groupValues] = await Promise.all([
    valuesOf(fieldMetricId(config, functionIds), conversationIds),
    valuesOf(groupMetricId(config, functionIds), conversationIds),
  ]);
  return {
    kind: fieldValueKind({
      field: config.field,
      metricEvalType: metric?.evalType ?? null,
      metadataFieldType: config.metadataFieldType,
    }),
    isRating: metric?.evalType === MetricEvalType.continuous_qualitative,
    displayName: displayNameOf(config, metric),
    values,
    groupValues,
  };
};
