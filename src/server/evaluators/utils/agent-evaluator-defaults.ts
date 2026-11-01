import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { AgentEvaluatorDefaults } from '@/server/evaluators/types';
import { ensureDefaultPersonalityId } from '@/server/personalities/utils/default-personality';

const defaultMetricIds = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
) => {
  const assigned = await tx.metric.findMany({
    where: { projectId, agents: { some: { agentId } } },
    orderBy: { displayOrder: Prisma.SortOrder.asc },
    select: { id: true },
  });
  if (assigned.length > 0) return assigned.map((metric) => metric.id);
  const simulationMetrics = await tx.metric.findMany({
    where: { projectId, simulationEnabled: true },
    orderBy: { displayOrder: Prisma.SortOrder.asc },
    select: { id: true },
  });
  return simulationMetrics.map((metric) => metric.id);
};

export const getAgentEvaluatorDefaults = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
): Promise<AgentEvaluatorDefaults> => {
  const agent = await tx.agent.findFirstOrThrow({
    where: { id: agentId, projectId },
    select: {
      id: true,
      language: true,
      defaultTestProfileId: true,
      enabledPersonalities: {
        select: { personalityId: true },
        orderBy: { personalityId: Prisma.SortOrder.asc },
        take: 1,
      },
      mockTools: {
        select: { id: true, name: true },
        orderBy: { name: Prisma.SortOrder.asc },
      },
    },
  });
  const personalityId =
    agent.enabledPersonalities[0]?.personalityId ??
    (await ensureDefaultPersonalityId(tx, projectId));
  return {
    agentId: agent.id,
    defaultTestProfileId: agent.defaultTestProfileId,
    personalityId,
    language: agent.language,
    metricIds: await defaultMetricIds(tx, projectId, agentId),
    mockTools: agent.mockTools,
  };
};
