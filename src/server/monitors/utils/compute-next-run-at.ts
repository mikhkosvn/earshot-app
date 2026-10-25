import 'server-only';

import type { Timezone } from '@/generated/prisma/enums';
import { nextCronDate } from '@/lib/cron/list-cron-dates';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

export const computeNextRunAt = (
  cronExpression: string,
  timezone: Timezone,
  from = new Date(),
) =>
  nextCronDate({
    expression: cronExpression,
    timeZone: TimezoneLabel[timezone],
    from,
  });
