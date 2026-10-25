import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { ActionError } from '@/server/common/run-action';

export const assertAgentInProject = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  agentId: number,
) => {
  const agent = await tx.agent.findFirst({
    where: { id: agentId, projectId },
    select: { id: true, name: true },
  });
  if (!agent) throw new ActionError('The agent does not exist.', 404);
  return agent;
};
