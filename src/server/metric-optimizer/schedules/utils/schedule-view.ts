import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { SCHEDULE_INPUT_KEY } from '@/server/metric-optimizer/constants/optimizer-limits';
import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';

export const scheduleSelect = {
  id: true,
  projectId: true,
  name: true,
  cronExpression: true,
  timezone: true,
  isActive: true,
  nextRunAt: true,
  createdAt: true,
} satisfies Prisma.MetricOptimizerScheduleSelect;

type ScheduleRow = Prisma.MetricOptimizerScheduleGetPayload<{
  select: typeof scheduleSelect;
}>;

const lastRunAtOf = async (schedule: ScheduleRow) => {
  const job = await prisma.backgroundJob.findFirst({
    where: {
      projectId: schedule.projectId,
      kind: JobKind.metric_optimization,
      input: { path: [SCHEDULE_INPUT_KEY], equals: schedule.id },
    },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    select: { createdAt: true },
  });
  return job?.createdAt ?? null;
};

export const toScheduleView = async (
  row: ScheduleRow,
): Promise<OptimizerScheduleView> => ({
  id: row.id,
  name: row.name,
  cronExpression: row.cronExpression,
  timezone: row.timezone,
  isActive: row.isActive,
  nextRunAt: row.nextRunAt,
  createdAt: row.createdAt,
  lastRunAt: await lastRunAtOf(row),
});
