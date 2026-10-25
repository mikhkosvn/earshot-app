import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listOptimizerSchedulesSchema } from '@/server/metric-optimizer/schemas';
import {
  scheduleSelect,
  toScheduleView,
} from '@/server/metric-optimizer/schedules/utils/schedule-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listOptimizerSchedules = withValidation(
  listOptimizerSchedulesSchema,
  async ({ projectId }) => {
    await requireProjectAccess(projectId);
    const rows = await prisma.metricOptimizerSchedule.findMany({
      where: { projectId },
      orderBy: { createdAt: Prisma.SortOrder.asc },
      select: scheduleSelect,
    });
    return Promise.all(rows.map(toScheduleView));
  },
);
