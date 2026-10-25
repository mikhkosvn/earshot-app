import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { monitorIdSchema } from '@/server/monitors/schemas';
import type { MonitorDetail } from '@/server/monitors/types';
import { monitorAccessWhere } from '@/server/monitors/utils/monitor-access';

export const getMonitor = withValidation(
  monitorIdSchema,
  async ({ monitorId }): Promise<MonitorDetail> => {
    const { user } = await requireUser();
    const { evaluators, personalities, ...monitor } =
      await prisma.monitor.findUniqueOrThrow({
        where: { id: monitorId, AND: [monitorAccessWhere(user.id)] },
        select: {
          id: true,
          name: true,
          agentId: true,
          cronExpression: true,
          timezone: true,
          frequency: true,
          concurrencyLimit: true,
          callsPerSecond: true,
          callerNumberMode: true,
          agentNumber: true,
          evaluators: {
            select: { evaluatorId: true },
            orderBy: { evaluatorId: Prisma.SortOrder.asc },
          },
          personalities: {
            select: { personalityId: true },
            orderBy: { personalityId: Prisma.SortOrder.asc },
          },
        },
      });
    return {
      ...monitor,
      evaluatorIds: evaluators.map((row) => row.evaluatorId),
      personalityIds: personalities.map((row) => row.personalityId),
    };
  },
);
