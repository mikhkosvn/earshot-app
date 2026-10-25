import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listMonitorsSchema } from '@/server/monitors/schemas';
import type { MonitorListPage } from '@/server/monitors/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listMonitors = withValidation(
  listMonitorsSchema,
  async ({ projectId, page, pageSize }): Promise<MonitorListPage> => {
    await requireProjectAccess(projectId);
    const where: Prisma.MonitorWhereInput = { projectId };
    const [count, rows] = await prisma.$transaction([
      prisma.monitor.count({ where }),
      prisma.monitor.findMany({
        where,
        orderBy: { id: Prisma.SortOrder.desc },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          agentId: true,
          cronExpression: true,
          timezone: true,
          frequency: true,
          nextRunAt: true,
          isActive: true,
          _count: { select: { evaluators: true } },
        },
      }),
    ]);
    const results = rows.map(({ _count, ...row }) => ({
      ...row,
      scenarioCount: _count.evaluators,
    }));
    return { count, results };
  },
);
