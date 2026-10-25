import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updateOptimizerScheduleSchema } from '@/server/metric-optimizer/schemas';
import { nextScheduleRun } from '@/server/metric-optimizer/schedules/utils/next-schedule-run';
import { requireScheduleAccess } from '@/server/metric-optimizer/schedules/utils/require-schedule-access';
import {
  scheduleSelect,
  toScheduleView,
} from '@/server/metric-optimizer/schedules/utils/schedule-view';

export const updateOptimizerSchedule = withValidation(
  updateOptimizerScheduleSchema,
  async ({ scheduleId, name, cronExpression, isActive }) => {
    const { schedule } = await requireScheduleAccess(scheduleId);
    const timezone = schedule.project.timezone;
    const row = await prisma.metricOptimizerSchedule.update({
      where: { id: scheduleId },
      data: {
        name,
        cronExpression,
        timezone,
        isActive,
        nextRunAt: nextScheduleRun({ cronExpression, timezone, isActive }),
      },
      select: scheduleSelect,
    });
    return toScheduleView(row);
  },
);
