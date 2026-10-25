import { z } from 'zod';

import {
  CallEvaluationStatus,
  RunStatus,
} from '@/generated/prisma/enums';
import {
  RESULT_PAGE_SIZE_MAX,
  RunSortField,
  SortDirection,
} from '@/server/results/constants/result-list';

const idSchema = z.number().int().positive();
const idList = z.array(idSchema);

export const resultFiltersSchema = z.object({
  agentIds: idList,
  evaluatorIds: idList,
  tags: z.array(z.string().min(1)),
  statuses: z.array(z.enum(RunStatus)),
  evaluationStatuses: z.array(z.enum(CallEvaluationStatus)),
});

const pageSchema = {
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(RESULT_PAGE_SIZE_MAX),
};

export const listResultsSchema = z.object({
  projectId: idSchema,
  filters: resultFiltersSchema,
  ...pageSchema,
});

export const exportResultsSchema = z.object({
  projectId: idSchema,
  filters: resultFiltersSchema,
});

export const listRunsSchema = z.object({
  projectId: idSchema,
  resultId: idSchema.nullable(),
  filters: resultFiltersSchema,
  sortBy: z.enum(RunSortField),
  sortDir: z.enum(SortDirection),
  ...pageSchema,
});

export const projectScopeSchema = z.object({
  projectId: idSchema,
});

export const resultIdSchema = z.object({
  resultId: idSchema,
});

export const runIdSchema = z.object({
  runId: idSchema,
});

export const deleteResultsSchema = z.object({
  projectId: idSchema,
  resultIds: idList.min(1, 'Select at least one result.'),
});

export const deleteRunsSchema = z.object({
  projectId: idSchema,
  resultId: idSchema,
  runIds: idList.min(1, 'Select at least one run.'),
});

export const renameResultSchema = z.object({
  resultId: idSchema,
  name: z
    .string()
    .trim()
    .min(1, 'Enter a label.')
    .max(200, 'The label must have 200 or fewer characters.'),
});
