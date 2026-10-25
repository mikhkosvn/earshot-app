import 'server-only';

import { registerWorkerTask } from '@/server/worker/registry';
import { failStaleJobsTask } from '@/server/worker/tasks/fail-stale-jobs-task';

export const registerWorkerTasks = () => {
  registerWorkerTask(failStaleJobsTask);
};
