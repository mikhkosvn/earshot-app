import 'server-only';

import { registerWorkerTask } from '@/server/worker/registry';
import { failStaleJobsTask } from '@/server/worker/tasks/fail-stale-jobs-task';
import { monitorSchedulerTask } from '@/server/worker/tasks/monitor-scheduler-task';

export const registerWorkerTasks = () => {
  registerWorkerTask(failStaleJobsTask);
  registerWorkerTask(monitorSchedulerTask);
};
