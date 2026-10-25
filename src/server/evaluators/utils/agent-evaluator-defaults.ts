import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { AgentEvaluatorDefaults } from '@/server/evaluators/types';
import { enabledPersonalityWhere } from '@/server/evaluators/utils/evaluator-access-where';

const firstProjectPersonalityId = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  language: Prisma.PersonalityWhereInput['language'],
) => {
  const personality = await tx.personality.findFirst({
    where: { language, ...enabledPersonalityWhere(projectId) },
    orderBy: [
      { isStarred: Prisma.SortOrder.desc },
      { id: Prisma.SortOrder.asc },
    ],
    select: { id: true },
  });
  return personality?.id ?? null;
};

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
    (await firstProjectPersonalityId(tx, projectId, agent.language)) ??
    (await firstProjectPersonalityId(tx, projectId, undefined));
  return {
    agentId: agent.id,
    defaultTestProfileId: agent.defaultTestProfileId,
    personalityId,
    language: agent.language,
    metricIds: await defaultMetricIds(tx, projectId, agentId),
    mockTools: agent.mockTools,
  };
};
