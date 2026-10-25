import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireScheduleAccess = async (scheduleId: number) => {
  const { user } = await requireUser();
  const schedule = await prisma.metricOptimizerSchedule.findUniqueOrThrow({
    where: { id: scheduleId, project: projectAccessWhere(user.id) },
    select: {
      id: true,
      projectId: true,
      project: { select: { timezone: true } },
    },
  });
  return { user, schedule };
};
