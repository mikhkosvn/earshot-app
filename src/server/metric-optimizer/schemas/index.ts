import { z } from 'zod';

import { isValidCronExpression } from '@/lib/cron/is-valid-cron-expression';
import { labDraftSchema } from '@/server/labs/schemas';
import { SCHEDULE_NAME_MAX_LENGTH } from '@/server/metric-optimizer/constants/optimizer-limits';

const idSchema = z.number().int().positive();

export const startMetricOptimizationSchema = z.object({
  metricId: idSchema,
  draft: labDraftSchema,
});

export const optimizationSessionSchema = z.object({
  sessionId: idSchema,
});

export const optimizerScheduleFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter a name.')
    .max(
      SCHEDULE_NAME_MAX_LENGTH,
      `The name must have ${SCHEDULE_NAME_MAX_LENGTH} or fewer characters.`,
    ),
  cronExpression: z
    .string()
    .trim()
    .min(1, 'Enter a cron expression.')
    .refine(isValidCronExpression, 'Enter a valid cron expression.'),
  isActive: z.boolean(),
});

export const createOptimizerScheduleSchema =
  optimizerScheduleFieldsSchema.extend({
    projectId: idSchema,
  });

export const updateOptimizerScheduleSchema =
  optimizerScheduleFieldsSchema.extend({
    scheduleId: idSchema,
  });

export const optimizerScheduleIdSchema = z.object({
  scheduleId: idSchema,
});

export const listOptimizerSchedulesSchema = z.object({
  projectId: idSchema,
});

export const proposalSummarySchema = z.object({
  whatChanged: z.array(z.string()),
  whatItChecks: z.string(),
  returnsFalseWhen: z.string(),
  returnsTrueWhen: z.string(),
  notApplicableWhen: z.string(),
});
