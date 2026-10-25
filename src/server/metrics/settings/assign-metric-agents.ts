import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { assignMetricAgentsSchema } from '@/server/metrics/schemas';
import { filterProjectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const assignMetricAgents = withValidation(
  assignMetricAgentsSchema,
  async ({ projectId, metricIds, agentIds }) => {
    await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const metrics = await tx.metric.findMany({
        where: { projectId, id: { in: metricIds } },
        select: { id: true },
      });
      const ids = metrics.map((metric) => metric.id);
      const validAgentIds = await filterProjectAgentIds(
        tx,
        projectId,
        agentIds,
      );
      await tx.metricAgent.deleteMany({ where: { metricId: { in: ids } } });
      await tx.metricAgent.createMany({
        data: ids.flatMap((metricId) =>
          validAgentIds.map((agentId) => ({ metricId, agentId })),
        ),
      });
      return { count: ids.length };
    });
  },
);
