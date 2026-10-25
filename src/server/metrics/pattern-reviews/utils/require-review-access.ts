import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireReviewAccess = async (reviewId: number) => {
  const { user } = await requireUser();
  const review = await prisma.metricPatternReview.findUniqueOrThrow({
    where: { id: reviewId, metric: { project: projectAccessWhere(user.id) } },
    select: {
      id: true,
      status: true,
      metricId: true,
      metric: { select: { name: true, projectId: true } },
    },
  });
  return { user, review };
};
