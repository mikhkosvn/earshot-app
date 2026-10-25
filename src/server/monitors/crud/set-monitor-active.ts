import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { setMonitorActiveSchema } from '@/server/monitors/schemas';
import type { MonitorActiveState } from '@/server/monitors/types';
import { computeNextRunAt } from '@/server/monitors/utils/compute-next-run-at';
import { monitorAccessWhere } from '@/server/monitors/utils/monitor-access';

const activeStateSelect = { id: true, isActive: true, nextRunAt: true };

export const setMonitorActive = withValidation(
  setMonitorActiveSchema,
  async ({ monitorId, isActive }): Promise<MonitorActiveState> => {
    const { user } = await requireUser();
    const monitor = await prisma.monitor.findUniqueOrThrow({
      where: { id: monitorId, AND: [monitorAccessWhere(user.id)] },
      select: { id: true, cronExpression: true, timezone: true },
    });
    if (!isActive) {
      return prisma.monitor.update({
        where: { id: monitor.id },
        data: { isActive },
        select: activeStateSelect,
      });
    }
    return prisma.monitor.update({
      where: { id: monitor.id },
      data: {
        isActive,
        nextRunAt: computeNextRunAt(monitor.cronExpression, monitor.timezone),
      },
      select: activeStateSelect,
    });
  },
);
