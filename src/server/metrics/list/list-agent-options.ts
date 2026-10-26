import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectIdSchema } from '@/server/metrics/schemas';
import type { AgentOption } from '@/server/metrics/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listAgentOptions = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<AgentOption[]> => {
    await requireProjectAccess(projectId);
    const agents = await prisma.agent.findMany({
      where: { projectId },
      orderBy: { id: Prisma.SortOrder.asc },
      select: { id: true, name: true, language: true, description: true },
    });
    addEventFields({
      project: { id: projectId },
      agents: { count: agents.length },
    });
    return agents;
  },
);
