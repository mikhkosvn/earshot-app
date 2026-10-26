import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { listAgentsSchema } from '@/server/agents/schemas';
import type { AgentListPage } from '@/server/agents/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const searchWhere = (search: string): Prisma.AgentWhereInput => {
  if (!search) return {};
  const id = Number(search.replace(/^#/, ''));
  const nameMatch: Prisma.AgentWhereInput = {
    name: { contains: search, mode: Prisma.QueryMode.insensitive },
  };
  if (!Number.isInteger(id) || id <= 0) return nameMatch;
  return { OR: [nameMatch, { id }] };
};

export const listAgents = withValidation(
  listAgentsSchema,
  async ({ projectId, page, pageSize, search }): Promise<AgentListPage> => {
    await requireProjectAccess(projectId);
    const where: Prisma.AgentWhereInput = {
      projectId,
      ...searchWhere(search),
    };
    const [count, results] = await prisma.$transaction([
      prisma.agent.count({ where }),
      prisma.agent.findMany({
        where,
        orderBy: { id: Prisma.SortOrder.desc },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          provider: true,
          language: true,
          phoneNumber: true,
          inbound: true,
        },
      }),
    ]);
    addEventFields({
      project: { id: projectId },
      agents: {
        count: results.length,
        total_count: count,
        page,
        has_search: Boolean(search),
      },
    });
    return { count, results };
  },
);
