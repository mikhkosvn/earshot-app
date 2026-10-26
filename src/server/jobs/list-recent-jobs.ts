import 'server-only';

import { subHours } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  JOB_RECENT_LIMIT,
  JOB_RECENT_WINDOW_HOURS,
} from '@/server/jobs/constants';
import { listRecentJobsSchema } from '@/server/jobs/schemas';
import { jobViewSelect, toJobView } from '@/server/jobs/utils/job-view';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listRecentJobs = withValidation(
  listRecentJobsSchema,
  async ({ projectId, kinds }) => {
    const { user } = await requireProjectAccess(projectId);
    const rows = await prisma.backgroundJob.findMany({
      where: {
        projectId,
        createdById: user.id,
        dismissedAt: null,
        createdAt: { gte: subHours(new Date(), JOB_RECENT_WINDOW_HOURS) },
        ...(kinds && { kind: { in: kinds } }),
      },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      take: JOB_RECENT_LIMIT,
      select: jobViewSelect,
    });
    addEventFields({ jobs: { kinds, count: rows.length } });
    return rows.map(toJobView);
  },
);
