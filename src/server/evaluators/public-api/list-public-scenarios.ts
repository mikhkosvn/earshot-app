import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { listPublicScenariosQuerySchema } from '@/server/evaluators/public-api/schemas';
import {
  publicScenarioSelect,
  toPublicScenario,
} from '@/server/evaluators/public-api/utils/public-scenario';
import { paginate, readPageParams } from '@/server/public-api/paginate';
import { resolveQueryProjectId } from '@/server/public-api/project-scope';

export const listPublicScenarios = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const projectId = await resolveQueryProjectId(auth, request);
  const query = listPublicScenariosQuerySchema.parse({
    folder_path:
      new URL(request.url).searchParams.get('folder_path') ?? undefined,
  });
  const where: Prisma.EvaluatorWhereInput = {
    projectId,
    ...(query.folder_path && { folder: { path: query.folder_path } }),
  };
  const { page, pageSize, skip, take } = readPageParams(request);
  const [count, rows] = await prisma.$transaction([
    prisma.evaluator.count({ where }),
    prisma.evaluator.findMany({
      where,
      orderBy: { id: Prisma.SortOrder.asc },
      skip,
      take,
      select: publicScenarioSelect,
    }),
  ]);
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    folder: { path: query.folder_path },
    evaluators: { count, returned: rows.length, page, page_size: pageSize },
  });
  return paginate({
    page,
    pageSize,
    count,
    results: rows.map(toPublicScenario),
    request,
  });
};
