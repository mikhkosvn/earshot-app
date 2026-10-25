import 'server-only';

import { z } from 'zod';

import { Prisma } from '@/generated/prisma/client';
import {
  ChartType,
  WidgetField,
  WidgetGroupByType,
} from '@/generated/prisma/enums';
import { BASE_PLOT_CONFIG } from '@/server/dashboards/constants/dashboard-defaults';
import {
  FilterField,
  FilterGroupOperator,
  FilterOp,
} from '@/server/dashboards/constants/filter-grammar';
import { MetadataFieldType } from '@/server/dashboards/constants/plot/metadata-field-type';
import {
  AggregationDisplay,
  PlotAggregation,
  STORED_AGGREGATION,
} from '@/server/dashboards/constants/plot/plot-aggregation';
import { PlotColor } from '@/server/dashboards/constants/plot/plot-color';
import {
  DISPLAY_CHART_TYPE,
  PlotDisplayType,
  TIME_SERIES_DISPLAY_TYPES,
} from '@/server/dashboards/constants/plot/plot-display-type';
import { PlotOutcome } from '@/server/dashboards/constants/plot/plot-outcome';
import {
  GROUP_BY_AGENT_FIELD,
  GROUP_BY_DURATION_INTERVAL_MS,
  GROUP_BY_METADATA_PREFIX,
  WidgetGroupBy,
} from '@/server/dashboards/constants/plot/widget-group-by';
import type { PlotConfig, WidgetItem } from '@/server/dashboards/types';
import { storedOutcomeFilter } from '@/server/dashboards/utils/dashboard-filters';

export const widgetSelect = {
  id: true,
  name: true,
  chartType: true,
  field: true,
  metricId: true,
  metadataKey: true,
  aggregation: true,
  timePeriod: true,
  groupByType: true,
  groupByField: true,
  filters: true,
  sortPosition: true,
  displayOptions: true,
} satisfies Prisma.WidgetSelect;

type WidgetRecord = Prisma.WidgetGetPayload<{ select: typeof widgetSelect }>;

const displayOptionsSchema = z.object({
  displayType: z.enum(PlotDisplayType).optional(),
  color: z.enum(PlotColor).optional(),
  showPercentages: z.boolean().optional(),
  aggregationDisplay: z.enum(AggregationDisplay).optional(),
  metadataFieldType: z.enum(MetadataFieldType).optional(),
});

const CHART_DISPLAY_TYPE: Record<ChartType, PlotDisplayType> = {
  [ChartType.line]: PlotDisplayType.line,
  [ChartType.bar]: PlotDisplayType.bar,
  [ChartType.pie]: PlotDisplayType.pie,
  [ChartType.stat]: PlotDisplayType.stat,
};

const groupByOf = (record: WidgetRecord) => {
  if (record.groupByType === WidgetGroupByType.bucket) {
    return { groupBy: WidgetGroupBy.duration, groupByMetadataKey: null };
  }
  const field = record.groupByField ?? '';
  if (field === GROUP_BY_AGENT_FIELD) {
    return { groupBy: WidgetGroupBy.agent, groupByMetadataKey: null };
  }
  if (field.startsWith(GROUP_BY_METADATA_PREFIX)) {
    return {
      groupBy: WidgetGroupBy.metadata,
      groupByMetadataKey: field.slice(GROUP_BY_METADATA_PREFIX.length),
    };
  }
  const parsed = z.enum(WidgetGroupBy).safeParse(field);
  if (parsed.success) {
    return { groupBy: parsed.data, groupByMetadataKey: null };
  }
  return { groupBy: WidgetGroupBy.none, groupByMetadataKey: null };
};

const outcomeOf = (filters: unknown) => {
  const success = storedOutcomeFilter(filters);
  if (success === true) return PlotOutcome.success;
  if (success === false) return PlotOutcome.failure;
  return PlotOutcome.all;
};

const aggregationOf = (
  record: WidgetRecord,
  display: AggregationDisplay | undefined,
): PlotAggregation | null => {
  if (!record.aggregation) return null;
  if (display === AggregationDisplay.percentage) {
    return PlotAggregation.percentage;
  }
  return record.aggregation;
};

const storedDisplayOptions = (json: unknown) => {
  const parsed = displayOptionsSchema.safeParse(json ?? {});
  if (!parsed.success) return {};
  return parsed.data;
};

export const toPlotConfig = (record: WidgetRecord): PlotConfig => {
  const display = storedDisplayOptions(record.displayOptions);
  return {
    ...BASE_PLOT_CONFIG,
    name: record.name ?? '',
    displayType: display.displayType ?? CHART_DISPLAY_TYPE[record.chartType],
    field: record.field,
    metricId: record.metricId,
    metadataKey: record.metadataKey,
    metadataFieldType: display.metadataFieldType ?? null,
    aggregation: aggregationOf(record, display.aggregationDisplay),
    timePeriod: record.timePeriod,
    ...groupByOf(record),
    color: display.color ?? PlotColor.blue,
    showPercentages: display.showPercentages ?? false,
    outcome: outcomeOf(record.filters),
  };
};

export const toWidgetItem = (record: WidgetRecord): WidgetItem => ({
  id: record.id,
  sortPosition: record.sortPosition,
  config: toPlotConfig(record),
});

const isTimeSeries = (config: PlotConfig) =>
  TIME_SERIES_DISPLAY_TYPES.includes(config.displayType);

const groupByData = (config: PlotConfig) => {
  const empty = {
    groupByType: null,
    groupByField: null,
    groupByIntervalMs: null,
  };
  if (!isTimeSeries(config) || config.groupBy === WidgetGroupBy.none) {
    return empty;
  }
  if (config.groupBy === WidgetGroupBy.duration) {
    return {
      groupByType: WidgetGroupByType.bucket,
      groupByField: WidgetField.duration,
      groupByIntervalMs: GROUP_BY_DURATION_INTERVAL_MS,
    };
  }
  if (config.groupBy === WidgetGroupBy.agent) {
    return {
      ...empty,
      groupByType: WidgetGroupByType.field,
      groupByField: GROUP_BY_AGENT_FIELD,
    };
  }
  if (config.groupBy === WidgetGroupBy.metadata) {
    return {
      ...empty,
      groupByType: WidgetGroupByType.field,
      groupByField: `${GROUP_BY_METADATA_PREFIX}${config.groupByMetadataKey ?? ''}`,
    };
  }
  return {
    ...empty,
    groupByType: WidgetGroupByType.field,
    groupByField: config.groupBy,
  };
};

const outcomeFilters = (outcome: PlotOutcome) => {
  if (outcome === PlotOutcome.all) return Prisma.DbNull;
  return {
    operator: FilterGroupOperator.and,
    conditions: [
      {
        field: FilterField.success,
        op: FilterOp.eq,
        value: outcome === PlotOutcome.success,
      },
    ],
  };
};

const seriesData = (config: PlotConfig) => {
  if (!isTimeSeries(config) || !config.aggregation) {
    return { aggregation: null, timePeriod: null };
  }
  return {
    aggregation: STORED_AGGREGATION[config.aggregation],
    timePeriod: config.timePeriod,
  };
};

const aggregationDisplayOf = (config: PlotConfig) => {
  if (!isTimeSeries(config)) return undefined;
  if (config.aggregation !== PlotAggregation.percentage) return undefined;
  return AggregationDisplay.percentage;
};

const displayOptionsOf = (config: PlotConfig): Prisma.InputJsonObject => {
  const options: Record<string, string | boolean> = {
    displayType: config.displayType,
    color: config.color,
    showPercentages: config.showPercentages,
  };
  const aggregationDisplay = aggregationDisplayOf(config);
  if (aggregationDisplay) options.aggregationDisplay = aggregationDisplay;
  if (config.metadataFieldType) {
    options.metadataFieldType = config.metadataFieldType;
  }
  return options;
};

const metricIdOf = (config: PlotConfig) => {
  if (config.field !== WidgetField.metric_value) return null;
  return config.metricId;
};

const metadataKeyOf = (config: PlotConfig) => {
  if (config.field !== WidgetField.metadata) return null;
  return config.metadataKey;
};

export const toWidgetData = (config: PlotConfig, sortPosition: number) => ({
  name: config.name,
  chartType: DISPLAY_CHART_TYPE[config.displayType],
  field: config.field,
  metricId: metricIdOf(config),
  metadataKey: metadataKeyOf(config),
  ...seriesData(config),
  ...groupByData(config),
  filters: outcomeFilters(config.outcome),
  sortPosition,
  displayOptions: displayOptionsOf(config),
});
