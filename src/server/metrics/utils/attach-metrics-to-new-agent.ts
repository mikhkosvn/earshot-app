import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

type AttachMetricsArgs = {
  projectId: number;
  agentId: number;
};

export const attachMetricsToNewAgent = async (
  tx: Prisma.TransactionClient,
  { projectId, agentId }: AttachMetricsArgs,
) => {
  const metrics = await tx.metric.findMany({
    where: { projectId, addToNewAgents: true },
    select: { id: true },
  });
  const { count } = await tx.metricAgent.createMany({
    data: metrics.map((metric) => ({ metricId: metric.id, agentId })),
    skipDuplicates: true,
  });
  return { count };
};
