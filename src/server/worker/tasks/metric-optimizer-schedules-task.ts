import 'server-only';

import { OPTIMIZER_SCHEDULER_INTERVAL_MS } from '@/server/metric-optimizer/constants/optimizer-limits';
import { runDueOptimizerSchedules } from '@/server/metric-optimizer/scheduler/run-due-optimizer-schedules';
import type { WorkerTask } from '@/server/worker/types';

export const metricOptimizerSchedulesTask: WorkerTask = {
  name: 'metric-optimizer-schedules',
  intervalMs: OPTIMIZER_SCHEDULER_INTERVAL_MS,
  run: async () => {
    await runDueOptimizerSchedules();
  },
};
