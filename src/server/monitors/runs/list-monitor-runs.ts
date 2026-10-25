import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { MONITOR_RUN_HISTORY_LIMIT } from '@/server/monitors/constants/monitor-limits';
import { monitorIdSchema } from '@/server/monitors/schemas';
import type { MonitorRunItem } from '@/server/monitors/types';
import { monitorAccessWhere } from '@/server/monitors/utils/monitor-access';

export const listMonitorRuns = withValidation(
  monitorIdSchema,
  async ({ monitorId }): Promise<MonitorRunItem[]> => {
    const { user } = await requireUser();
    const monitor = await prisma.monitor.findUniqueOrThrow({
      where: { id: monitorId, AND: [monitorAccessWhere(user.id)] },
      select: { id: true, projectId: true },
    });
    const runs = await prisma.monitorRun.findMany({
      where: { monitorId: monitor.id },
      orderBy: { scheduledFor: Prisma.SortOrder.desc },
      take: MONITOR_RUN_HISTORY_LIMIT,
      select: {
        id: true,
        scheduledFor: true,
        status: true,
        errorMessage: true,
        startedAt: true,
        finishedAt: true,
        resultId: true,
      },
    });
    return runs.map((run) => ({ ...run, projectId: monitor.projectId }));
  },
);
