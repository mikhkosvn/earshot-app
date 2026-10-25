import type { inferParserType } from 'nuqs/server';

import type { evaluatorListParams } from '@/app/(app)/test-case/_constants/evaluator-list-params';
import type {
  EvaluatorFilterInput,
  ListEvaluatorsInput,
} from '@/server/evaluators/types';

export type EvaluatorListParams = inferParserType<typeof evaluatorListParams>;

export const toEvaluatorFilterInput = (
  projectId: number,
  params: EvaluatorListParams,
): EvaluatorFilterInput => ({
  projectId,
  folderPath: params.folder,
  search: params.search,
  tags: params.tags,
  tagLogic: params.tagLogic,
  personalityIds: params.personalities,
  agentIds: params.agents,
  metricIds: params.metrics,
  metricLogic: params.metricLogic,
});

export const toListEvaluatorsInput = (
  projectId: number,
  params: EvaluatorListParams,
): ListEvaluatorsInput => ({
  ...toEvaluatorFilterInput(projectId, params),
  page: params.page,
  pageSize: params.pageSize,
  sortBy: params.sortBy,
  sortDir: params.sortDir,
});
