import { z } from 'zod';

import {
  AlertType,
  ChangeDirection,
  ThresholdOperator,
} from '@/generated/prisma/enums';
import {
  ALERT_FILTER_ROWS_MAX,
  ALERT_FILTER_TEXT_MAX,
  ALERT_NAME_MAX_LENGTH,
  ALERT_WINDOW_SIZE_MAX,
} from '@/server/alerts/constants/alert-limits';
import { AlertWindowHours } from '@/server/alerts/constants/alert-window';

const idSchema = z.number().int().positive();

const countSchema = (label: string, max = ALERT_WINDOW_SIZE_MAX) =>
  z
    .number({ error: `Enter the ${label}.` })
    .int(`The ${label} must be a whole number.`)
    .min(1, `The ${label} must be 1 or more.`)
    .max(max, `The ${label} must be ${max} or less.`);

const numberSchema = (label: string) =>
  z.number({ error: `Enter the ${label}.` }).finite();

export const projectScopeSchema = z.object({ projectId: idSchema });

export const alertWindowSchema = z.enum(AlertWindowHours);

export const alertReviewSchema = z.object({
  projectId: idSchema,
  hours: alertWindowSchema,
});

export const alertMetadataFilterSchema = z.object({
  key: z
    .string()
    .trim()
    .min(1, 'Enter a metadata key.')
    .max(ALERT_FILTER_TEXT_MAX),
  value: z.string().trim().max(ALERT_FILTER_TEXT_MAX),
});

export const callMetadataSchema = z.record(z.string(), z.unknown()).catch({});

export const alertFiltersSchema = z.object({
  agentIds: z.array(idSchema).max(ALERT_FILTER_ROWS_MAX),
  metadata: z
    .array(alertMetadataFilterSchema)
    .max(
      ALERT_FILTER_ROWS_MAX,
      `Add at most ${ALERT_FILTER_ROWS_MAX} metadata filters.`,
    ),
});

const normalParamsSchema = z.object({ type: z.literal(AlertType.normal) });

const thresholdParamsSchema = z
  .object({
    type: z.literal(AlertType.threshold),
    thresholdOperator: z.enum(ThresholdOperator),
    thresholdValue: numberSchema('threshold value'),
    thresholdUpperValue: numberSchema('high value'),
    minBreaches: countSchema('minimum breaches'),
    windowSize: countSchema('window'),
  })
  .refine((params) => params.minBreaches <= params.windowSize, {
    error: 'The minimum breaches must not be more than the window.',
    path: ['minBreaches'],
  })
  .refine(
    (params) =>
      params.thresholdOperator !== ThresholdOperator.outside ||
      params.thresholdUpperValue > params.thresholdValue,
    {
      error: 'The high value must be more than the low value.',
      path: ['thresholdUpperValue'],
    },
  );

const trendParamsSchema = z.object({
  type: z.literal(AlertType.significant_change),
  windowSize: countSchema('window'),
  stdMultiplier: z.number().positive().max(10),
  ewmaAlpha: z.number().gt(0).max(1),
});

const newModeParamsSchema = z.object({
  type: z.literal(AlertType.insight_new_mode),
  minCalls: countSchema('minimum calls'),
});

const spikeParamsSchema = z.object({
  type: z.literal(AlertType.insight_uptick),
  minCount: countSchema('minimum count'),
  multiplier: z.number().positive().max(100),
  windowHours: countSchema('window', 720),
  baselineHours: countSchema('baseline', 2160),
});

export const alertParamsSchema = z.discriminatedUnion('type', [
  normalParamsSchema,
  thresholdParamsSchema,
  trendParamsSchema,
  newModeParamsSchema,
  spikeParamsSchema,
]);

export const createAlertSchema = z.object({
  projectId: idSchema,
  metricId: z
    .number({ error: 'Select a metric.' })
    .int()
    .positive('Select a metric.'),
  name: z
    .string()
    .trim()
    .max(
      ALERT_NAME_MAX_LENGTH,
      `The name must be ${ALERT_NAME_MAX_LENGTH} characters or fewer.`,
    ),
  params: alertParamsSchema,
});

export const updateAlertSchema = z.object({
  alertId: idSchema,
  name: createAlertSchema.shape.name.optional(),
  enabled: z.boolean().optional(),
  params: alertParamsSchema.optional(),
  direction: z.enum(ChangeDirection).optional(),
  filters: alertFiltersSchema.optional(),
});

export const alertIdSchema = z.object({ alertId: idSchema });
