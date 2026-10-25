import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { createOptimizerScheduleSchema } from '@/server/metric-optimizer/schemas';
import { nextScheduleRun } from '@/server/metric-optimizer/schedules/utils/next-schedule-run';
import {
  scheduleSelect,
  toScheduleView,
} from '@/server/metric-optimizer/schedules/utils/schedule-view';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createOptimizerSchedule = withValidation(
  createOptimizerScheduleSchema,
  async ({ projectId, name, cronExpression, isActive }) => {
    const { project } = await requireProjectAccess(projectId);
    const row = await prisma.metricOptimizerSchedule.create({
      data: {
        projectId,
        name,
        cronExpression,
        timezone: project.timezone,
        isActive,
        nextRunAt: nextScheduleRun({
          cronExpression,
          timezone: project.timezone,
          isActive,
        }),
      },
      select: scheduleSelect,
    });
    return toScheduleView(row);
  },
);
