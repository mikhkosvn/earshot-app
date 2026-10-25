import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const agentAccessWhere = (userId: number) => ({
  project: projectAccessWhere(userId),
});

export const requireAgentAccess = async (agentId: number) => {
  const { user } = await requireUser();
  const agent = await prisma.agent.findUniqueOrThrow({
    where: { id: agentId, ...agentAccessWhere(user.id) },
    select: { id: true, projectId: true, name: true },
  });
  return { user, agent };
};
