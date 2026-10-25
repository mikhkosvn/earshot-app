import type { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';
import type { ResultFilters } from '@/server/results/types';

export type ResultFilterParams = {
  agent: number[];
  evaluator: number[];
  tag: string[];
  status: RunStatus[];
  evaluation: CallEvaluationStatus[];
};

export const toResultFilters = (params: ResultFilterParams): ResultFilters => ({
  agentIds: params.agent,
  evaluatorIds: params.evaluator,
  tags: params.tag,
  statuses: params.status,
  evaluationStatuses: params.evaluation,
});

export const activeFilterCount = (params: ResultFilterParams) =>
  params.agent.length +
  params.evaluator.length +
  params.tag.length +
  params.status.length +
  params.evaluation.length;
