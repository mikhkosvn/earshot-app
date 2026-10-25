import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { MetricColumn } from '@/server/results/types';

export const listMetricColumns = async (
  projectId: number,
): Promise<MetricColumn[]> => {
  const metrics = await prisma.metric.findMany({
    where: { projectId, simulationEnabled: true },
    orderBy: [
      { displayOrder: Prisma.SortOrder.asc },
      { id: Prisma.SortOrder.asc },
    ],
    select: {
      id: true,
      name: true,
      evalType: true,
      predefinedMetric: { select: { functionName: true } },
    },
  });
  return metrics.map((metric) => ({
    id: metric.id,
    name: metric.name,
    evalType: metric.evalType,
    functionName: metric.predefinedMetric?.functionName ?? null,
  }));
};
