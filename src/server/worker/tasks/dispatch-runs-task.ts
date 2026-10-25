import 'server-only';

import { RUN_DISPATCH_INTERVAL_MS } from '@/server/runs/constants/run-limits';
import { dispatchRuns } from '@/server/runs/execution/dispatch-runs';
import { startPendingResults } from '@/server/runs/execution/start-pending-results';
import type { WorkerTask } from '@/server/worker/types';

export const dispatchRunsTask: WorkerTask = {
  name: 'dispatch-runs',
  intervalMs: RUN_DISPATCH_INTERVAL_MS,
  run: async () => {
    await startPendingResults();
    await dispatchRuns();
  },
};
