import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { projectScopeSchema } from '@/server/alerts/schemas';
import type { AlertMetricOption } from '@/server/alerts/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listAlertMetricOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<AlertMetricOption[]> => {
    await requireProjectAccess(projectId);
    const metrics = await prisma.metric.findMany({
      where: { projectId },
      orderBy: [
        { displayOrder: Prisma.SortOrder.asc },
        { id: Prisma.SortOrder.asc },
      ],
      select: {
        id: true,
        name: true,
        evalType: true,
        agents: { select: { agentId: true } },
      },
    });
    addEventFields({
      project: { id: projectId },
      metrics: { count: metrics.length },
    });
    return metrics.map(({ agents, ...metric }) => ({
      ...metric,
      agentIds: agents.map((agent) => agent.agentId),
    }));
  },
);
