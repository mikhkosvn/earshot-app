import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { dismissAllJobsSchema } from '@/server/jobs/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const dismissAllJobs = withValidation(
  dismissAllJobsSchema,
  async ({ projectId, kinds }) => {
    const { user } = await requireProjectAccess(projectId);
    const { count } = await prisma.backgroundJob.updateMany({
      where: {
        projectId,
        createdById: user.id,
        dismissedAt: null,
        ...(kinds && { kind: { in: kinds } }),
      },
      data: { dismissedAt: new Date() },
    });
    return { count };
  },
);
