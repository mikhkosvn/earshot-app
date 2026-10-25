import 'server-only';

import { MONITOR_SCHEDULER_INTERVAL_MS } from '@/server/monitors/constants/monitor-scheduler';
import { failStalledMonitorRuns } from '@/server/monitors/scheduler/fail-stalled-monitor-runs';
import { finishMonitorRuns } from '@/server/monitors/scheduler/finish-monitor-runs';
import { queueDueMonitors } from '@/server/monitors/scheduler/queue-due-monitors';
import { startQueuedMonitorRuns } from '@/server/monitors/scheduler/start-queued-monitor-runs';
import type { WorkerTask } from '@/server/worker/types';

export const monitorSchedulerTask: WorkerTask = {
  name: 'monitor-scheduler',
  intervalMs: MONITOR_SCHEDULER_INTERVAL_MS,
  run: async () => {
    await queueDueMonitors();
    await startQueuedMonitorRuns();
    await finishMonitorRuns();
    await failStalledMonitorRuns();
  },
};
