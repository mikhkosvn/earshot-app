import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { RUN_DISPATCH_INTERVAL_MS } from '@/server/runs/constants/run-limits';
import { dispatchRuns } from '@/server/runs/execution/dispatch-runs';
import { startPendingResults } from '@/server/runs/execution/start-pending-results';
import type { WorkerTask } from '@/server/worker/types';

export const dispatchRunsTask: WorkerTask = {
  name: 'dispatch-runs',
  intervalMs: RUN_DISPATCH_INTERVAL_MS,
  run: async () => {
    const startedResults = await startPendingResults();
    const launchedRuns = await dispatchRuns();
    if (startedResults === 0 && launchedRuns.length === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({
      worker: {
        results_started: startedResults,
        runs_launched: launchedRuns.length,
      },
    });
  },
};
