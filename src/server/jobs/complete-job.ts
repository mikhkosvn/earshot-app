import 'server-only';

import { JobStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import type { JobResultPayload } from '@/server/jobs/types';

interface CompleteJobArgs {
  jobId: string;
  step: string;
  result: JobResultPayload;
}

export const completeJob = async ({ jobId, step, result }: CompleteJobArgs) => {
  const { count } = await prisma.backgroundJob.updateMany({
    where: { id: jobId, status: JobStatus.running },
    data: {
      status: JobStatus.completed,
      currentStep: step,
      result,
      finishedAt: new Date(),
    },
  });
  addEventFields({ job: { id: jobId, completed: count > 0 } });
  return count > 0;
};
