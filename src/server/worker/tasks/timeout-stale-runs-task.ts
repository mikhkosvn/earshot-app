import 'server-only';

import { STALE_RUN_SWEEP_INTERVAL_MS } from '@/server/runs/constants/run-limits';
import { timeoutStaleRuns } from '@/server/runs/execution/timeout-stale-runs';
import type { WorkerTask } from '@/server/worker/types';

export const timeoutStaleRunsTask: WorkerTask = {
  name: 'timeout-stale-runs',
  intervalMs: STALE_RUN_SWEEP_INTERVAL_MS,
  run: async () => {
    const count = await timeoutStaleRuns();
    if (count > 0) {
      console.warn(
        `[worker] Closed runs of ${count} result(s) after a timeout.`,
      );
    }
  },
};
