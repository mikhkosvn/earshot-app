import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireAlertAccess = async (alertId: number) => {
  const { user } = await requireUser();
  const alert = await prisma.alertRule.findUniqueOrThrow({
    where: { id: alertId, metric: { project: projectAccessWhere(user.id) } },
    select: {
      id: true,
      type: true,
      metric: { select: { id: true, projectId: true, evalType: true } },
    },
  });
  return { user, alert };
};
