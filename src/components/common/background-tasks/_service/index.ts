import { queryOptions } from '@tanstack/react-query';

import type { JobStatus } from '@/generated/prisma/enums';
import { deferAction } from '@/lib/query-client/defer-action';
import {
  ACTIVE_JOB_STATUSES,
  JOB_IDLE_POLL_INTERVAL_MS,
  JOB_POLL_INTERVAL_MS,
} from '@/server/jobs/constants';
import { getJobAction, listRecentJobsAction } from '@/server/jobs/actions';
import type { JobView } from '@/server/jobs/types';

export const JobKey = {
  recent: 'recent-jobs',
  detail: 'job',
  dismiss: 'dismiss-job',
  dismissAll: 'dismiss-all-jobs',
} as const;

export type JobKey = (typeof JobKey)[keyof typeof JobKey];

const isActive = (status: JobStatus | undefined) =>
  status !== undefined && ACTIVE_JOB_STATUSES.includes(status);

const recentJobsInterval = (jobs: JobView[] | undefined) => {
  if (jobs?.some((job) => isActive(job.status))) return JOB_POLL_INTERVAL_MS;
  return JOB_IDLE_POLL_INTERVAL_MS;
};

const jobInterval = (job: JobView | undefined) => {
  if (job && !isActive(job.status)) return false;
  return JOB_POLL_INTERVAL_MS;
};

export class JobService {
  static readonly recentJobsKey = [JobKey.recent];
  static readonly dismissJobMutationKey = [JobKey.dismiss];
  static readonly dismissAllJobsMutationKey = [JobKey.dismissAll];

  static getRecentJobsQuery({ projectId }: { projectId: number }) {
    return queryOptions({
      queryKey: [JobKey.recent, projectId],
      queryFn: () => deferAction(() => listRecentJobsAction({ projectId })),
      staleTime: 0,
      refetchInterval: (query) => recentJobsInterval(query.state.data),
    });
  }

  static getJobQuery({ jobId }: { jobId: string }) {
    return queryOptions({
      queryKey: [JobKey.detail, jobId],
      queryFn: () => deferAction(() => getJobAction({ jobId })),
      staleTime: 0,
      refetchInterval: (query) => jobInterval(query.state.data),
    });
  }
}
