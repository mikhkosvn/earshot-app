import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const callLogAccessWhere = (userId: number) => ({
  project: projectAccessWhere(userId),
});

export const requireCallLogAccess = async (callLogId: number) => {
  const { user } = await requireUser();
  const callLog = await prisma.callLog.findUniqueOrThrow({
    where: { id: callLogId, ...callLogAccessWhere(user.id) },
    select: {
      id: true,
      projectId: true,
      agentId: true,
      conversationId: true,
      externalCallId: true,
    },
  });
  return { user, callLog };
};
