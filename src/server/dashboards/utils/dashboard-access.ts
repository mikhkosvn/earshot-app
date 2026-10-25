import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { addEventFields } from '@/server/common/logging/event-fields';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const dashboardAccessWhere = (userId: number) => ({
  project: projectAccessWhere(userId),
});

export const requireDashboardAccess = async (dashboardId: number) => {
  const { user } = await requireUser();
  const dashboard = await prisma.dashboard.findUniqueOrThrow({
    where: { id: dashboardId, ...dashboardAccessWhere(user.id) },
    select: {
      id: true,
      projectId: true,
      source: true,
      name: true,
      project: { select: { timezone: true } },
    },
  });
  addEventFields({
    dashboard: { id: dashboard.id, source: dashboard.source },
    project: { id: dashboard.projectId },
  });
  return { user, dashboard };
};
