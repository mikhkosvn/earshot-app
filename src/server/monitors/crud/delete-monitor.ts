import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { monitorIdSchema } from '@/server/monitors/schemas';
import type { MonitorRef } from '@/server/monitors/types';
import { monitorAccessWhere } from '@/server/monitors/utils/monitor-access';

export const deleteMonitor = withValidation(
  monitorIdSchema,
  async ({ monitorId }): Promise<MonitorRef> => {
    const { user } = await requireUser();
    const monitor = await prisma.monitor.findUniqueOrThrow({
      where: { id: monitorId, AND: [monitorAccessWhere(user.id)] },
      select: { id: true },
    });
    await prisma.monitor.delete({ where: { id: monitor.id } });
    return monitor;
  },
);
