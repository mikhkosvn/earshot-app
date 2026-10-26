import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { failStaleJobs } from '@/server/jobs/fail-stale-jobs';
import type { WorkerTask } from '@/server/worker/types';

export const failStaleJobsTask: WorkerTask = {
  name: 'fail-stale-jobs',
  intervalMs: 60_000,
  run: async () => {
    const { count } = await failStaleJobs();
    if (count === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({ worker: { stale_jobs_failed: count } });
  },
};
