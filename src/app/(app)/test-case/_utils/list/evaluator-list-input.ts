import type { inferParserType } from 'nuqs/server';

import type { evaluatorListParams } from '@/app/(app)/test-case/_constants/evaluator-list-params';
import type {
  EvaluatorFilterInput,
  ListEvaluatorsInput,
} from '@/server/evaluators/types';

export type EvaluatorListParams = inferParserType<typeof evaluatorListParams>;


export const toEvaluatorFilterInput = (
  projectId: number,
  folderId: number | null,
  params: EvaluatorListParams,
): EvaluatorFilterInput => ({
  projectId,
  folderId,
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
  folderId: number | null,
  params: EvaluatorListParams,
): ListEvaluatorsInput => ({
  ...toEvaluatorFilterInput(projectId, folderId, params),
  page: params.page,
  pageSize: params.pageSize,
  sortBy: params.sortBy,
  sortDir: params.sortDir,
});
