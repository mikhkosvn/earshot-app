import { z } from 'zod';

import {
  EVALUATOR_PAGE_SIZE_MAX,
  EvaluatorSortField,
  FilterLogic,
  SortDirection,
} from '@/server/evaluators/constants/evaluator-list';
import { projectIdSchema } from '@/server/evaluators/schemas/evaluator-fields';

const idList = z.array(z.number().int().positive());

export const evaluatorFilterSchema = z.object({
  projectId: projectIdSchema,
  folderPath: z.string().min(1),
  search: z.string().trim(),
  tags: z.array(z.string()),
  tagLogic: z.enum(FilterLogic),
  personalityIds: idList,
  agentIds: idList,
  metricIds: idList,
  metricLogic: z.enum(FilterLogic),
});

export const listEvaluatorsSchema = evaluatorFilterSchema.extend({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(EVALUATOR_PAGE_SIZE_MAX),
  sortBy: z.enum(EvaluatorSortField),
  sortDir: z.enum(SortDirection),
});
