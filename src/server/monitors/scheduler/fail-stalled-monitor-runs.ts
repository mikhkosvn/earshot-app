import 'server-only';

import { MonitorRunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { MONITOR_RUN_START_FAILED } from '@/server/monitors/constants/monitor-messages';
import { MONITOR_RUN_START_TIMEOUT_MS } from '@/server/monitors/constants/monitor-scheduler';

export const failStalledMonitorRuns = async () => {
  const now = new Date();
  const stalled = await prisma.monitorRun.updateMany({
    where: {
      status: MonitorRunStatus.running,
      resultId: null,
      startedAt: { lt: new Date(now.getTime() - MONITOR_RUN_START_TIMEOUT_MS) },
    },
    data: {
      status: MonitorRunStatus.failed,
      errorMessage: MONITOR_RUN_START_FAILED,
      finishedAt: now,
    },
  });
  addEventFields({ monitor_runs: { stalled: stalled.count } });
};
