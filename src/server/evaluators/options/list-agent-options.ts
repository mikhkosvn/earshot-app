import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { AgentOption } from '@/server/evaluators/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listAgentOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<AgentOption[]> => {
    await requireProjectAccess(projectId);
    return prisma.agent.findMany({
      where: { projectId },
      select: {
        id: true,
        name: true,
        language: true,
        defaultTestProfileId: true,
      },
      orderBy: [
        { createdAt: Prisma.SortOrder.desc },
        { id: Prisma.SortOrder.desc },
      ],
    });
  },
);
