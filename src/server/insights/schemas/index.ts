import { z } from 'zod';

import { ComparisonOperator } from '@/generated/prisma/enums';
import { isTimeExpression } from '@/lib/time-range/parse-time-expression';

const idSchema = z.number().int().positive();

const timeExpressionSchema = z
  .string()
  .trim()
  .refine(
    isTimeExpression,
    'Enter a time such as now-24h or 2026-10-01 00:00:00.',
  );

export const projectScopeSchema = z.object({ projectId: idSchema });

export const insightRangeSchema = z.object({
  projectId: idSchema,
  from: timeExpressionSchema,
  to: timeExpressionSchema,
  agentId: idSchema.nullable(),
});

export const saveInsightConfigSchema = z.object({
  projectId: idSchema,
  metricId: z
    .number({ error: 'Select a metric.' })
    .int()
    .positive('Select a metric.'),
  passOperator: z.enum(ComparisonOperator),
  passValue: z
    .string()
    .trim()
    .min(1, 'Enter the passing value.')
    .max(200, 'The passing value must be 200 characters or fewer.'),
  triageFailureLimit: z.number().int().positive().max(100).nullable(),
});

export const insightMetricSchema = z.object({
  projectId: idSchema,
  metricId: idSchema,
});

export const newCategoryAlertSchema = insightMetricSchema.extend({
  enabled: z.boolean(),
});

export const runInsightSchema = insightMetricSchema.extend({
  from: timeExpressionSchema,
  to: timeExpressionSchema,
});

export const categoryIdSchema = z.object({ categoryId: idSchema });

export const failureModeIdSchema = z.object({ failureModeId: idSchema });

export const researchResultSchema = z.object({
  headline: z.string(),
  failureModes: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      callLogIds: z.array(z.number().int()),
    }),
  ),
});
