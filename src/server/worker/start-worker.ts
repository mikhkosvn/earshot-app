import 'server-only';

import { listWorkerTasks } from '@/server/worker/registry';
import { registerWorkerTasks } from '@/server/worker/tasks';
import type { WorkerTask } from '@/server/worker/types';

const globalForWorker = globalThis as unknown as {
  earshotWorkerStarted: boolean | undefined;
};

const scheduleTask = (task: WorkerTask) => {
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      await task.run();
    } catch (error) {
      console.error(`[worker] The task "${task.name}" failed.`, error);
    } finally {
      running = false;
    }
  };
  const timer = setInterval(tick, task.intervalMs);
  timer.unref();
  void tick();
};

export const startWorker = () => {
  if (globalForWorker.earshotWorkerStarted) return;
  globalForWorker.earshotWorkerStarted = true;
  registerWorkerTasks();
  const tasks = listWorkerTasks();
  tasks.forEach(scheduleTask);
  console.info(
    `[worker] Started ${tasks.length} task(s): ${tasks.map((task) => task.name).join(', ')}.`,
  );
};
