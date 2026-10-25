import { Timezone } from '@/generated/prisma/enums';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

export const TIMEZONE_ITEMS = Object.values(Timezone).map((value) => ({
  value,
  label: TimezoneLabel[value],
}));
