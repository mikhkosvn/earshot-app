import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { dismissJobSchema } from '@/server/jobs/schemas';
import { jobAccessWhere } from '@/server/jobs/utils/job-access-where';

export const dismissJob = withValidation(
  dismissJobSchema,
  async ({ jobId }) => {
    const { user } = await requireUser();
    await prisma.backgroundJob.findUniqueOrThrow({
      where: { id: jobId, ...jobAccessWhere(user.id) },
      select: { id: true },
    });
    await prisma.backgroundJob.update({
      where: { id: jobId },
      data: { dismissedAt: new Date() },
    });
    return { jobId };
  },
);
