import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { RunSource } from '@/server/runs-overview/constants';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

const FINISHED_RUN_STATUSES: RunStatus[] = [
  RunStatus.completed,
  RunStatus.failed,
  RunStatus.timeout,
];

const listWhere = <T extends object>(ids: number[], where: T) => {
  if (ids.length === 0) return [];
  return [where];
};

const sourceWhere = (sources: RunSource[]): Prisma.RunWhereInput[] => {
  if (sources.length !== 1) return [];
  if (sources[0] === RunSource.monitor) {
    return [{ result: { monitorRun: { isNot: null } } }];
  }
  return [{ result: { monitorRun: { is: null } } }];
};

const agentWhere = (agentId: number | null): Prisma.RunWhereInput[] => {
  if (agentId === null) return [];
  return [{ result: { agentId } }];
};

export const runOverviewWhere = (
  projectId: number,
  range: { from: Date; to: Date },
  filters: RunsOverviewFilters,
): Prisma.RunWhereInput => ({
  status: { in: FINISHED_RUN_STATUSES },
  createdAt: { gte: range.from, lte: range.to },
  result: { projectId },
  AND: [
    ...agentWhere(filters.agentId),
    ...listWhere(filters.tagIds, {
      evaluator: { tags: { some: { tagId: { in: filters.tagIds } } } },
    }),
    ...listWhere(filters.personalityIds, {
      personalityId: { in: filters.personalityIds },
    }),
    ...listWhere(filters.evaluatorIds, {
      evaluatorId: { in: filters.evaluatorIds },
    }),
    ...listWhere(filters.folderIds, {
      evaluator: { folderId: { in: filters.folderIds } },
    }),
    ...listWhere(filters.monitorIds, {
      result: { monitorRun: { monitorId: { in: filters.monitorIds } } },
    }),
    ...sourceWhere(filters.runSources),
    ...listWhere(filters.resultIds, { resultId: { in: filters.resultIds } }),
    ...listWhere(filters.runIds, { id: { in: filters.runIds } }),
  ],
});
