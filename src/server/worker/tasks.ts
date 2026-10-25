import 'server-only';

import { registerWorkerTask } from '@/server/worker/registry';
import { dispatchRunsTask } from '@/server/worker/tasks/dispatch-runs-task';
import { failStaleJobsTask } from '@/server/worker/tasks/fail-stale-jobs-task';
import { monitorSchedulerTask } from '@/server/worker/tasks/monitor-scheduler-task';
import { timeoutStaleRunsTask } from '@/server/worker/tasks/timeout-stale-runs-task';

export const registerWorkerTasks = () => {
  registerWorkerTask(failStaleJobsTask);
  registerWorkerTask(dispatchRunsTask);
  registerWorkerTask(timeoutStaleRunsTask);
  registerWorkerTask(monitorSchedulerTask);
};
