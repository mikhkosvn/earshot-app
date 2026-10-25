import 'server-only';

import { registerWorkerTask } from '@/server/worker/registry';
import { alertEvaluationTask } from '@/server/worker/tasks/alert-evaluation-task';
import { deepResearchTask } from '@/server/worker/tasks/deep-research-task';
import { dispatchRunsTask } from '@/server/worker/tasks/dispatch-runs-task';
import { failStaleJobsTask } from '@/server/worker/tasks/fail-stale-jobs-task';
import { insightTriageTask } from '@/server/worker/tasks/insight-triage-task';
import { metricOptimizerSchedulesTask } from '@/server/worker/tasks/metric-optimizer-schedules-task';
import { monitorSchedulerTask } from '@/server/worker/tasks/monitor-scheduler-task';
import { observabilityNotificationsTask } from '@/server/worker/tasks/observability-notifications-task';
import { timeoutStaleRunsTask } from '@/server/worker/tasks/timeout-stale-runs-task';

export const registerWorkerTasks = () => {
  registerWorkerTask(failStaleJobsTask);
  registerWorkerTask(dispatchRunsTask);
  registerWorkerTask(timeoutStaleRunsTask);
  registerWorkerTask(monitorSchedulerTask);
  registerWorkerTask(metricOptimizerSchedulesTask);
  registerWorkerTask(alertEvaluationTask);
  registerWorkerTask(insightTriageTask);
  registerWorkerTask(deepResearchTask);
  registerWorkerTask(observabilityNotificationsTask);
};
