import { JobStatus } from '@/generated/prisma/enums';
import type { JobView } from '@/server/jobs/types';

export const jobRowText = (job: JobView) => {
  if (job.status === JobStatus.failed) return job.error ?? 'The task failed.';
  if (job.status === JobStatus.completed) {
    return job.result?.summary ?? job.currentStep ?? 'Completed';
  }
  return job.currentStep ?? 'Starting...';
};
