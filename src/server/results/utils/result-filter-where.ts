import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import type { ResultFilters } from '@/server/results/types';

const evaluatorRunWhere = (filters: ResultFilters): Prisma.RunWhereInput[] => {
  const conditions: Prisma.RunWhereInput[] = [];
  if (filters.evaluatorIds.length > 0) {
    conditions.push({ evaluatorId: { in: filters.evaluatorIds } });
  }
  if (filters.tags.length > 0) {
    conditions.push({
      evaluator: { tags: { some: { tag: { name: { in: filters.tags } } } } },
    });
  }
  if (filters.evaluationStatuses.length > 0) {
    conditions.push({ evaluationStatus: { in: filters.evaluationStatuses } });
  }
  return conditions;
};

export const resultFilterWhere = (
  projectId: number,
  filters: ResultFilters,
): Prisma.ResultWhereInput => {
  const runConditions = evaluatorRunWhere(filters);
  const where: Prisma.ResultWhereInput = { projectId };
  if (filters.agentIds.length > 0) where.agentId = { in: filters.agentIds };
  if (filters.statuses.length > 0) where.status = { in: filters.statuses };
  if (runConditions.length > 0) {
    where.runs = { some: { AND: runConditions } };
  }
  return where;
};

export const runFilterWhere = (
  projectId: number,
  resultId: number | null,
  filters: ResultFilters,
): Prisma.RunWhereInput => {
  const resultWhere: Prisma.ResultWhereInput = { projectId };
  if (resultId !== null) resultWhere.id = resultId;
  if (filters.agentIds.length > 0) {
    resultWhere.agentId = { in: filters.agentIds };
  }
  const where: Prisma.RunWhereInput = {
    result: resultWhere,
    AND: evaluatorRunWhere(filters),
  };
  if (filters.statuses.length > 0) where.status = { in: filters.statuses };
  return where;
};
