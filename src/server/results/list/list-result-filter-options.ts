import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { projectScopeSchema } from '@/server/results/schemas';
import type { ResultFilterOptions } from '@/server/results/types';

const byName = { name: Prisma.SortOrder.asc };

export const listResultFilterOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<ResultFilterOptions> => {
    await requireProjectAccess(projectId);
    const [agents, evaluators, tags] = await prisma.$transaction([
      prisma.agent.findMany({
        where: { projectId },
        select: { id: true, name: true },
        orderBy: byName,
      }),
      prisma.evaluator.findMany({
        where: { projectId },
        select: { id: true, name: true },
        orderBy: byName,
      }),
      prisma.tag.findMany({
        where: { projectId },
        select: { name: true },
        orderBy: byName,
      }),
    ]);
    return { agents, evaluators, tags: tags.map((tag) => tag.name) };
  },
);
