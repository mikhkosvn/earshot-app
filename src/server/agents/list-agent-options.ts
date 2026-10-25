import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { projectIdSchema } from '@/server/agents/schemas';
import type { AgentOption } from '@/server/agents/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listAgentOptions = withValidation(
  projectIdSchema,
  async ({ projectId }): Promise<AgentOption[]> => {
    await requireProjectAccess(projectId);
    const agents = await prisma.agent.findMany({
      where: { projectId },
      orderBy: { name: Prisma.SortOrder.asc },
      select: { id: true, name: true },
    });
    addEventFields({
      project: { id: projectId },
      agents: { count: agents.length },
    });
    return agents;
  },
);
