import 'server-only';

import { OptimizationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireOpenSession = async (sessionId: number) => {
  const { user } = await requireUser();
  const session = await prisma.metricOptimizationSession.findUniqueOrThrow({
    where: { id: sessionId, metric: { project: projectAccessWhere(user.id) } },
    select: { id: true, status: true, metricId: true },
  });
  if (session.status !== OptimizationStatus.awaiting_review) {
    throw new ActionError('This proposal is no longer open for review.');
  }
  return { user, session };
};
