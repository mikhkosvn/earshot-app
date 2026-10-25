import 'server-only';

import type { WorkerTask } from '@/server/worker/types';

const globalForWorker = globalThis as unknown as {
  earshotWorkerTasks: Map<string, WorkerTask> | undefined;
};

const getTaskMap = () => {
  globalForWorker.earshotWorkerTasks ??= new Map();
  return globalForWorker.earshotWorkerTasks;
};

export const registerWorkerTask = (task: WorkerTask) => {
  getTaskMap().set(task.name, task);
};

export const listWorkerTasks = () => [...getTaskMap().values()];
