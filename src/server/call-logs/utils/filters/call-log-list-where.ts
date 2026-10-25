import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CallFilterField,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';
import { filterNodeWhere } from '@/server/call-logs/utils/filters/filter-where';
import type { CallLogListScope, FilterNode } from '@/server/call-logs/types';

const searchWhere = (search: string): Prisma.CallLogWhereInput => {
  if (!search) return {};
  const contains = { contains: search, mode: Prisma.QueryMode.insensitive };
  return {
    OR: [
      { externalCallId: contains },
      { customerNumber: contains },
      { feedback: contains },
      { agent: { name: contains } },
      { conversation: { endedReason: contains } },
    ],
  };
};

const viewWhere = async (
  projectId: number,
  viewId: number | null,
): Promise<Prisma.CallLogWhereInput> => {
  if (!viewId) return {};
  const view = await prisma.savedView.findUniqueOrThrow({
    where: { id: viewId, projectId },
    select: { agents: { select: { agentId: true, agentVersionId: true } } },
  });
  return {
    OR: view.agents.map((entry) => ({
      agentId: entry.agentId,
      ...(entry.agentVersionId && { agentVersionId: entry.agentVersionId }),
    })),
  };
};

const timeConditions = (from: string, to: string): FilterNode[] => [
  { field: CallFilterField.timestamp, op: FilterOperator.gte, value: from },
  { field: CallFilterField.timestamp, op: FilterOperator.lte, value: to },
];

export const callLogListWhere = async (
  { projectId, from, to, conditions, search, viewId }: CallLogListScope,
  now = new Date(),
): Promise<Prisma.CallLogWhereInput> => ({
  AND: [
    { projectId },
    ...[...timeConditions(from, to), ...conditions].map((node) =>
      filterNodeWhere(node, now),
    ),
    searchWhere(search),
    await viewWhere(projectId, viewId),
  ],
});
