import 'server-only';

import type { Timezone } from '@/generated/prisma/enums';
import { computeNextRunAt } from '@/server/monitors/utils/compute-next-run-at';

interface NextScheduleRunArgs {
  cronExpression: string;
  timezone: Timezone;
  isActive: boolean;
  from?: Date;
}

export const nextScheduleRun = ({
  cronExpression,
  timezone,
  isActive,
  from = new Date(),
}: NextScheduleRunArgs) => {
  if (!isActive) return null;
  return computeNextRunAt(cronExpression, timezone, from);
};
