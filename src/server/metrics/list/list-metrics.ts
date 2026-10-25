import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listMetricsSchema } from '@/server/metrics/schemas';
import {
  metricListSelect,
  metricOrder,
  toMetricListItem,
} from '@/server/metrics/utils/metric-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const viewFilter = async (
  projectId: number,
  viewId: number | null | undefined,
): Promise<Prisma.MetricWhereInput> => {
  if (!viewId) return {};
  const view = await prisma.savedView.findUniqueOrThrow({
    where: { id: viewId, projectId },
    select: { agents: { select: { agentId: true } } },
  });
  const agentIds = view.agents.map((agent) => agent.agentId);
  return {
    OR: [
      { agents: { some: { agentId: { in: agentIds } } } },
      { agents: { none: {} } },
    ],
  };
};

export const listMetrics = withValidation(
  listMetricsSchema,
  async ({ projectId, viewId }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metric.findMany({
      where: { projectId, ...(await viewFilter(projectId, viewId)) },
      orderBy: metricOrder,
      select: metricListSelect,
    });
    return rows.map(toMetricListItem);
  },
);
