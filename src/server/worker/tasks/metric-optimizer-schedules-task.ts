import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { OPTIMIZER_SCHEDULER_INTERVAL_MS } from '@/server/metric-optimizer/constants/optimizer-limits';
import { runDueOptimizerSchedules } from '@/server/metric-optimizer/scheduler/run-due-optimizer-schedules';
import type { WorkerTask } from '@/server/worker/types';

export const metricOptimizerSchedulesTask: WorkerTask = {
  name: 'metric-optimizer-schedules',
  intervalMs: OPTIMIZER_SCHEDULER_INTERVAL_MS,
  run: async () => {
    const results = await runDueOptimizerSchedules();
    if (results.length === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({ worker: { schedules_run: results.length } });
  },
};
