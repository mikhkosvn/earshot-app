import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { updateMonitorSchema } from '@/server/monitors/schemas';
import type { MonitorRef } from '@/server/monitors/types';
import { monitorAccessWhere } from '@/server/monitors/utils/monitor-access';
import {
  evaluatorLinks,
  monitorScalarData,
  personalityLinks,
} from '@/server/monitors/utils/monitor-data';
import { validateMonitorFields } from '@/server/monitors/utils/validate-monitor-fields';

export const updateMonitor = withValidation(
  updateMonitorSchema,
  async ({ monitorId, ...fields }): Promise<MonitorRef> => {
    const { user } = await requireUser();
    const monitor = await prisma.monitor.findUniqueOrThrow({
      where: { id: monitorId, AND: [monitorAccessWhere(user.id)] },
      select: { id: true, projectId: true },
    });
    const { evaluatorIds, personalityIds, agentNumber } =
      await validateMonitorFields(monitor.projectId, fields);
    return prisma.monitor.update({
      where: { id: monitor.id },
      data: {
        ...monitorScalarData(fields, agentNumber),
        evaluators: {
          deleteMany: {},
          create: evaluatorLinks(evaluatorIds),
        },
        personalities: {
          deleteMany: {},
          create: personalityLinks(personalityIds),
        },
      },
      select: { id: true },
    });
  },
);
