'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { dismissAllJobs } from '@/server/jobs/dismiss-all-jobs';
import { dismissJob } from '@/server/jobs/dismiss-job';
import { getJob } from '@/server/jobs/get-job';
import { listRecentJobs } from '@/server/jobs/list-recent-jobs';
import type {
  DismissAllJobsInput,
  DismissJobInput,
  GetJobInput,
  JobView,
  ListRecentJobsInput,
} from '@/server/jobs/types';

export async function getJobAction(args: GetJobInput): Promise<JobView> {
  return getJob(args);
}

export async function listRecentJobsAction(
  args: ListRecentJobsInput,
): Promise<JobView[]> {
  return listRecentJobs(args);
}

export async function dismissJobAction(
  args: DismissJobInput,
): Promise<ActionResult<{ jobId: string }>> {
  return runAction(() => dismissJob(args));
}

export async function dismissAllJobsAction(
  args: DismissAllJobsInput,
): Promise<ActionResult<{ count: number }>> {
  return runAction(() => dismissAllJobs(args));
}
