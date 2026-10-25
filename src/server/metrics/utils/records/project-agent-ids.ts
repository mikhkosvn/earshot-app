import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

export const projectAgentIds = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const agents = await tx.agent.findMany({
    where: { projectId },
    select: { id: true },
  });
  return agents.map((agent) => agent.id);
};

export const filterProjectAgentIds = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentIds: number[],
) => {
  if (agentIds.length === 0) return [];
  const agents = await tx.agent.findMany({
    where: { projectId, id: { in: agentIds } },
    select: { id: true },
  });
  return agents.map((agent) => agent.id);
};
