import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { createMonitorSchema } from '@/server/monitors/schemas';
import type { MonitorRef } from '@/server/monitors/types';
import {
  evaluatorLinks,
  monitorScalarData,
  personalityLinks,
} from '@/server/monitors/utils/monitor-data';
import { validateMonitorFields } from '@/server/monitors/utils/validate-monitor-fields';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createMonitor = withValidation(
  createMonitorSchema,
  async ({ projectId, ...fields }): Promise<MonitorRef> => {
    const { user } = await requireProjectAccess(projectId);
    const { evaluatorIds, personalityIds, agentNumber } =
      await validateMonitorFields(projectId, fields);
    const monitor = await prisma.monitor.create({
      data: {
        ...monitorScalarData(fields, agentNumber),
        projectId,
        createdById: user.id,
        evaluators: { create: evaluatorLinks(evaluatorIds) },
        personalities: { create: personalityLinks(personalityIds) },
      },
      select: { id: true },
    });
    addEventFields({
      project: { id: projectId },
      monitor: {
        id: monitor.id,
        evaluator_count: evaluatorIds.length,
        personality_count: personalityIds.length,
      },
    });
    return monitor;
  },
);
