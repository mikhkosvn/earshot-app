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
import { JobsActionOperation } from '@/server/jobs/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getJobAction(args: GetJobInput): Promise<JobView> {
  return withActionEvent(JobsActionOperation.getJob, () => getJob(args));
}

export async function listRecentJobsAction(
  args: ListRecentJobsInput,
): Promise<JobView[]> {
  return withActionEvent(JobsActionOperation.listRecentJobs, () =>
    listRecentJobs(args),
  );
}

export async function dismissJobAction(
  args: DismissJobInput,
): Promise<ActionResult<{ jobId: string }>> {
  return withActionEvent(JobsActionOperation.dismissJob, () =>
    runAction(() => dismissJob(args)),
  );
}

export async function dismissAllJobsAction(
  args: DismissAllJobsInput,
): Promise<ActionResult<{ count: number }>> {
  return withActionEvent(JobsActionOperation.dismissAllJobs, () =>
    runAction(() => dismissAllJobs(args)),
  );
}
