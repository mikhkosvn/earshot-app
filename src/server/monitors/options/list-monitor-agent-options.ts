import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { monitorProjectScopeSchema } from '@/server/monitors/schemas';
import type { MonitorAgentOption } from '@/server/monitors/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listMonitorAgentOptions = withValidation(
  monitorProjectScopeSchema,
  async ({ projectId }): Promise<MonitorAgentOption[]> => {
    await requireProjectAccess(projectId);
    const agents = await prisma.agent.findMany({
      where: { projectId },
      select: { id: true, name: true, phoneNumber: true },
      orderBy: [
        { createdAt: Prisma.SortOrder.desc },
        { id: Prisma.SortOrder.desc },
      ],
    });
    addEventFields({
      project: { id: projectId },
      agents: { count: agents.length },
    });
    return agents;
  },
);
