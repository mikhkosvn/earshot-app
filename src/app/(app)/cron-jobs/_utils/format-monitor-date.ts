import type { Timezone } from '@/generated/prisma/enums';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

export const formatMonitorDate = (date: Date | null, timezone: Timezone) => {
  if (!date) return '-';
  return new Intl.DateTimeFormat('en-US', {
    timeZone: TimezoneLabel[timezone],
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
};
