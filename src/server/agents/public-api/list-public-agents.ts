import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import {
  publicAgentSelect,
  toPublicAgent,
} from '@/server/agents/public-api/utils/public-agent';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { paginate, readPageParams } from '@/server/public-api/paginate';
import { resolveQueryProjectId } from '@/server/public-api/project-scope';

export const listPublicAgents = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const projectId = await resolveQueryProjectId(auth, request);
  const where: Prisma.AgentWhereInput = { projectId };
  const { page, pageSize, skip, take } = readPageParams(request);
  const [count, rows] = await prisma.$transaction([
    prisma.agent.count({ where }),
    prisma.agent.findMany({
      where,
      orderBy: { id: Prisma.SortOrder.asc },
      skip,
      take,
      select: publicAgentSelect,
    }),
  ]);
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    agents: { count, returned: rows.length, page, page_size: pageSize },
  });
  return paginate({
    page,
    pageSize,
    count,
    results: rows.map(toPublicAgent),
    request,
  });
};
