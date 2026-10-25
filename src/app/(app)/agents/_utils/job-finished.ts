import { JobStatus } from '@/generated/prisma/enums';
import { FINISHED_JOB_STATUSES } from '@/server/jobs/constants';

export const isJobFinished = (status: JobStatus | undefined) =>
  status !== undefined && FINISHED_JOB_STATUSES.includes(status);

export const isJobFailed = (status: JobStatus | undefined) =>
  status === JobStatus.failed;
