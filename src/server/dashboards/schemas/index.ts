import { z } from 'zod';

import {
  DashboardSource,
  WidgetField,
  WidgetTimePeriod,
} from '@/generated/prisma/enums';
import { isTimeExpression } from '@/lib/time-range/parse-time-expression';

import { MetadataFieldType } from '../constants/plot/metadata-field-type';
import { PlotAggregation } from '../constants/plot/plot-aggregation';
import { PlotColor } from '../constants/plot/plot-color';
import {
  PlotDisplayType,
  TIME_SERIES_DISPLAY_TYPES,
} from '../constants/plot/plot-display-type';
import { PlotOutcome } from '../constants/plot/plot-outcome';
import { WidgetGroupBy } from '../constants/plot/widget-group-by';

const idSchema = z.number().int().positive();

const timeExpressionSchema = z
  .string()
  .trim()
  .refine(isTimeExpression, 'Enter a time such as now-7d.');

export const metadataConditionSchema = z.object({
  key: z.string().trim().min(1, 'Enter a metadata key.').max(200),
  value: z.string().trim().min(1, 'Enter a value.').max(500),
});

export const dashboardFilterStateSchema = z.object({
  from: timeExpressionSchema,
  to: timeExpressionSchema,
  agentId: idSchema.nullable(),
  metadata: z.array(metadataConditionSchema).max(20),
});

const optionalKey = z.string().trim().max(200).nullable();

export const plotConfigBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter a plot name.')
    .max(255, 'The plot name must have 255 or fewer characters.'),
  displayType: z.enum(PlotDisplayType),
  field: z.enum(WidgetField),
  metricId: idSchema.nullable(),
  metadataKey: optionalKey,
  metadataFieldType: z.enum(MetadataFieldType).nullable(),
  aggregation: z.enum(PlotAggregation).nullable(),
  timePeriod: z.enum(WidgetTimePeriod).nullable(),
  groupBy: z.enum(WidgetGroupBy),
  groupByMetadataKey: optionalKey,
  color: z.enum(PlotColor),
  showPercentages: z.boolean(),
  outcome: z.enum(PlotOutcome),
});

type RefinedPlot = {
  field: WidgetField | null;
  metricId: number | null;
  metadataKey: string | null;
  groupBy: WidgetGroupBy;
  groupByMetadataKey: string | null;
  displayType: PlotDisplayType;
};

export const refinePlotConfig = (
  plot: RefinedPlot,
  context: z.RefinementCtx,
) => {
  if (plot.field === WidgetField.metric_value && plot.metricId === null) {
    context.addIssue({
      code: 'custom',
      path: ['metricId'],
      message: 'Select a metric.',
    });
  }
  if (plot.field === WidgetField.metadata && !plot.metadataKey) {
    context.addIssue({
      code: 'custom',
      path: ['metadataKey'],
      message: 'Enter a metadata key.',
    });
  }
  if (
    plot.groupBy === WidgetGroupBy.metadata &&
    TIME_SERIES_DISPLAY_TYPES.includes(plot.displayType) &&
    !plot.groupByMetadataKey
  ) {
    context.addIssue({
      code: 'custom',
      path: ['groupByMetadataKey'],
      message: 'Enter a metadata key.',
    });
  }
};

export const plotConfigSchema =
  plotConfigBaseSchema.superRefine(refinePlotConfig);

export const projectSourceSchema = z.object({
  projectId: idSchema,
  source: z.enum(DashboardSource),
});

export const dashboardIdSchema = z.object({
  dashboardId: idSchema,
});

export const projectIdSchema = z.object({
  projectId: idSchema,
});

const dashboardNameSchema = z
  .string()
  .trim()
  .min(1, 'Enter a dashboard name.')
  .max(255, 'The dashboard name must have 255 or fewer characters.');

export const createDashboardSchema = z.object({
  projectId: idSchema,
  source: z.enum(DashboardSource),
  name: dashboardNameSchema,
});

export const renameDashboardSchema = z.object({
  dashboardId: idSchema,
  name: dashboardNameSchema,
});

export const setDashboardDailyReportSchema = z.object({
  dashboardId: idSchema,
  includeInDailyReport: z.boolean(),
});

export const saveDashboardChangesSchema = z.object({
  dashboardId: idSchema,
  filters: dashboardFilterStateSchema,
  plots: z
    .array(z.object({ id: idSchema.nullable(), config: plotConfigSchema }))
    .max(40, 'A dashboard can have 40 or fewer plots.'),
});

export const getPlotDataSchema = z.object({
  dashboardId: idSchema,
  plot: plotConfigSchema,
  filters: dashboardFilterStateSchema,
});
