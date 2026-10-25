import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const requireLabReviewAccess = async (reviewId: number) => {
  const { user } = await requireUser();
  const review = await prisma.labReview.findUniqueOrThrow({
    where: {
      id: reviewId,
      metric: { project: projectAccessWhere(user.id) },
    },
    select: { id: true, metricId: true },
  });
  return { user, review };
};
