import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { optimizerScheduleIdSchema } from '@/server/metric-optimizer/schemas';
import { requireScheduleAccess } from '@/server/metric-optimizer/schedules/utils/require-schedule-access';

export const deleteOptimizerSchedule = withValidation(
  optimizerScheduleIdSchema,
  async ({ scheduleId }) => {
    const { schedule } = await requireScheduleAccess(scheduleId);
    await prisma.metricOptimizerSchedule.delete({ where: { id: scheduleId } });
    addEventFields({
      project: { id: schedule.projectId },
      optimizer_schedule: { id: scheduleId },
    });
    return { scheduleId, projectId: schedule.projectId };
  },
);
