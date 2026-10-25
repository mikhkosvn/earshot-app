import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireMetricAccess = async (metricId: number) => {
  const { user } = await requireUser();
  const metric = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId, project: projectAccessWhere(user.id) },
    select: {
      id: true,
      projectId: true,
      name: true,
      type: true,
      predefinedMetricId: true,
      predefinedMetric: { select: { editable: true } },
    },
  });
  return { user, metric };
};
