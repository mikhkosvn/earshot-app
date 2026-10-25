import type { ActionResult } from '@/lib/action-result';
import {
  ACTIVE_JOB_STATUSES,
  JOB_POLL_INTERVAL_MS,
} from '@/server/jobs/constants';
import { getJobAction } from '@/server/jobs/actions';

const MAX_POLLS = 400;

const pause = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const waitForJob = async <T extends { jobId: string }>(
  result: ActionResult<T>,
): Promise<ActionResult<T>> => {
  if (!result.ok) return result;
  for (let poll = 0; poll < MAX_POLLS; poll += 1) {
    await pause(JOB_POLL_INTERVAL_MS);
    const job = await getJobAction({ jobId: result.data.jobId });
    if (!ACTIVE_JOB_STATUSES.includes(job.status)) return result;
  }
  return result;
};
