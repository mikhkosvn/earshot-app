import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { paginate, readPageParams } from '@/server/public-api/paginate';
import { resolveQueryProjectId } from '@/server/public-api/project-scope';
import { listPublicTestProfilesQuerySchema } from '@/server/test-profiles/public-api/schemas';
import {
  publicTestProfileSelect,
  toPublicTestProfile,
} from '@/server/test-profiles/public-api/utils/public-test-profile';

export const listPublicTestProfiles = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const projectId = await resolveQueryProjectId(auth, request);
  const { searchParams } = new URL(request.url);
  const query = listPublicTestProfilesQuerySchema.parse({
    agent_id: searchParams.get('agent_id') ?? undefined,
    search: searchParams.get('search') ?? undefined,
  });
  const where: Prisma.TestProfileWhereInput = {
    projectId,
    ...(query.agent_id && { agentId: query.agent_id }),
    ...(query.search && {
      name: { contains: query.search, mode: Prisma.QueryMode.insensitive },
    }),
  };
  const { page, pageSize, skip, take } = readPageParams(request);
  const [count, rows] = await prisma.$transaction([
    prisma.testProfile.count({ where }),
    prisma.testProfile.findMany({
      where,
      orderBy: { id: Prisma.SortOrder.asc },
      skip,
      take,
      select: publicTestProfileSelect,
    }),
  ]);
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    agent: { id: query.agent_id },
    search: { length: query.search?.length ?? 0 },
    test_profiles: { count, returned: rows.length, page, page_size: pageSize },
  });
  return paginate({
    page,
    pageSize,
    count,
    results: rows.map(toPublicTestProfile),
    request,
  });
};
