import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  EvaluatorSortField,
  FilterLogic,
  type SortDirection,
} from '@/server/evaluators/constants/evaluator-list';
import type { EvaluatorFilterInput } from '@/server/evaluators/types';
import {
  ALL_EVALUATORS_FOLDER_PATH,
  FOLDER_PATH_SEPARATOR,
} from '@/server/folders/constants';

const folderWhere = (folderPath: string): Prisma.EvaluatorWhereInput => {
  if (folderPath === ALL_EVALUATORS_FOLDER_PATH) return {};
  return {
    folder: {
      OR: [
        { path: folderPath },
        { path: { startsWith: `${folderPath}${FOLDER_PATH_SEPARATOR}` } },
      ],
    },
  };
};

const idMatches = (search: string): Prisma.EvaluatorWhereInput[] => {
  const id = Number(search);
  if (!Number.isInteger(id) || id <= 0) return [];
  return [{ id }];
};

const searchWhere = (search: string): Prisma.EvaluatorWhereInput => {
  if (!search) return {};
  return {
    OR: [
      { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ...idMatches(search),
    ],
  };
};

const inListWhere = (
  ids: number[],
  toWhere: (ids: number[]) => Prisma.EvaluatorWhereInput,
): Prisma.EvaluatorWhereInput[] => {
  if (ids.length === 0) return [];
  return [toWhere(ids)];
};

const tagsWhere = (
  tags: string[],
  logic: FilterLogic,
): Prisma.EvaluatorWhereInput[] => {
  if (tags.length === 0) return [];
  if (logic === FilterLogic.and) {
    return tags.map((name) => ({ tags: { some: { tag: { name } } } }));
  }
  return [{ tags: { some: { tag: { name: { in: tags } } } } }];
};

const metricsWhere = (
  metricIds: number[],
  logic: FilterLogic,
): Prisma.EvaluatorWhereInput[] => {
  if (metricIds.length === 0) return [];
  if (logic === FilterLogic.and) {
    return metricIds.map((metricId) => ({ metrics: { some: { metricId } } }));
  }
  return [{ metrics: { some: { metricId: { in: metricIds } } } }];
};

export const evaluatorFilterWhere = (
  filter: EvaluatorFilterInput,
): Prisma.EvaluatorWhereInput => ({
  projectId: filter.projectId,
  AND: [
    folderWhere(filter.folderPath),
    searchWhere(filter.search),
    ...tagsWhere(filter.tags, filter.tagLogic),
    ...metricsWhere(filter.metricIds, filter.metricLogic),
    ...inListWhere(filter.personalityIds, (ids) => ({
      personalityId: { in: ids },
    })),
    ...inListWhere(filter.agentIds, (ids) => ({ agentId: { in: ids } })),
  ],
});

export const evaluatorOrderBy = (
  sortBy: EvaluatorSortField,
  sortDir: SortDirection,
): Prisma.EvaluatorOrderByWithRelationInput[] => {
  const byField: Record<
    EvaluatorSortField,
    Prisma.EvaluatorOrderByWithRelationInput
  > = {
    [EvaluatorSortField.id]: { id: sortDir },
    [EvaluatorSortField.name]: { name: sortDir },
    [EvaluatorSortField.personality]: { personality: { name: sortDir } },
    [EvaluatorSortField.agent]: { agent: { name: sortDir } },
    [EvaluatorSortField.testProfile]: { testProfile: { name: sortDir } },
    [EvaluatorSortField.language]: { language: sortDir },
    [EvaluatorSortField.createdAt]: { createdAt: sortDir },
    [EvaluatorSortField.updatedAt]: { updatedAt: sortDir },
  };
  return [byField[sortBy], { id: Prisma.SortOrder.desc }];
};
