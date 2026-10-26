import 'server-only';

import { subMinutes } from 'date-fns';

import { JobStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  ACTIVE_JOB_STATUSES,
  JOB_MAX_RUNTIME_MINUTES,
  JOB_STALE_ERROR,
} from '@/server/jobs/constants';

export const failStaleJobs = async () => {
  const cutoff = subMinutes(new Date(), JOB_MAX_RUNTIME_MINUTES);
  const { count } = await prisma.backgroundJob.updateMany({
    where: {
      status: { in: ACTIVE_JOB_STATUSES },
      OR: [
        { startedAt: { lt: cutoff } },
        { startedAt: null, createdAt: { lt: cutoff } },
      ],
    },
    data: {
      status: JobStatus.failed,
      error: JOB_STALE_ERROR,
      finishedAt: new Date(),
    },
  });
  addEventFields({ jobs: { failed_stale: count } });
  return { count };
};
