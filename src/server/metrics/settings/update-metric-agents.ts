import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updateMetricAgentsSchema } from '@/server/metrics/schemas';
import {
  metricListSelect,
  toMetricListItem,
} from '@/server/metrics/utils/metric-view';
import { filterProjectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

export const updateMetricAgents = withValidation(
  updateMetricAgentsSchema,
  async ({ metricId, agentIds, addToNewAgents }) => {
    const { metric } = await requireMetricAccess(metricId);
    const row = await prisma.$transaction(async (tx) => {
      const validIds = await filterProjectAgentIds(
        tx,
        metric.projectId,
        agentIds,
      );
      return tx.metric.update({
        where: { id: metricId },
        data: {
          addToNewAgents,
          agents: {
            deleteMany: {},
            create: validIds.map((agentId) => ({ agentId })),
          },
        },
        select: metricListSelect,
      });
    });
    return toMetricListItem(row);
  },
);
