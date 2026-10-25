import 'server-only';

import { failStaleJobs } from '@/server/jobs/fail-stale-jobs';
import type { WorkerTask } from '@/server/worker/types';

export const failStaleJobsTask: WorkerTask = {
  name: 'fail-stale-jobs',
  intervalMs: 60_000,
  run: async () => {
    const { count } = await failStaleJobs();
    if (count > 0)
      console.warn(`[worker] Marked ${count} stale job(s) as failed.`);
  },
};
