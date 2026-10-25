import { z } from 'zod';

import { isTimeExpression } from '@/lib/time-range/parse-time-expression';

import { OVERVIEW_PERIODS, RunSource } from '../constants';

const idSchema = z.number().int().positive();

const timeExpressionSchema = z
  .string()
  .trim()
  .refine(isTimeExpression, 'Enter a time such as now-7d.');

const idListSchema = z.array(idSchema).max(500);

export const runsOverviewFiltersSchema = z.object({
  agentId: idSchema.nullable(),
  tagIds: idListSchema,
  personalityIds: idListSchema,
  evaluatorIds: idListSchema,
  folderIds: idListSchema,
  monitorIds: idListSchema,
  runSources: z.array(z.enum(RunSource)).max(2),
  resultIds: idListSchema,
  runIds: idListSchema,
});

export const getRunsOverviewSchema = z.object({
  projectId: idSchema,
  from: timeExpressionSchema,
  to: timeExpressionSchema,
  period: z.enum(OVERVIEW_PERIODS),
  filters: runsOverviewFiltersSchema,
});

export const projectIdSchema = z.object({
  projectId: idSchema,
});

export const createConfigurationSchema = z.object({
  projectId: idSchema,
  name: z
    .string()
    .trim()
    .min(1, 'Enter a dashboard name.')
    .max(255, 'The dashboard name must have 255 or fewer characters.'),
  rangeFrom: timeExpressionSchema,
  rangeTo: timeExpressionSchema,
  filters: runsOverviewFiltersSchema,
  includeMetricVisibility: z.boolean(),
  hiddenMetricIds: idListSchema,
});
