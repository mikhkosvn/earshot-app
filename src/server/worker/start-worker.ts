import 'server-only';

import { TriggerType } from '@/lib/logging/constants';
import { EventKind } from '@/server/common/logging/constants';
import { runWithEvent } from '@/server/common/logging/run-with-event';
import { listWorkerTasks } from '@/server/worker/registry';
import { registerWorkerTasks } from '@/server/worker/tasks';
import type { WorkerTask } from '@/server/worker/types';

const globalForWorker = globalThis as unknown as {
  earshotWorkerStarted: boolean | undefined;
};

const WORKER_OPERATION_PREFIX = 'worker.';

const ignoreLoggedFailure = () => undefined;

const runTask = (task: WorkerTask) =>
  runWithEvent(
    {
      kind: EventKind.worker_task,
      operation: `${WORKER_OPERATION_PREFIX}${task.name}`,
      trigger: TriggerType.background,
      fields: { worker: { task: task.name, interval_ms: task.intervalMs } },
      newTrace: true,
      quietWhenSkipped: true,
    },
    task.run,
  );

const scheduleTask = (task: WorkerTask) => {
  let running = false;
  const tick = async () => {
    if (running) return;
    running = true;
    try {
      await runTask(task).catch(ignoreLoggedFailure);
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
};
