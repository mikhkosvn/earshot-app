import { Timezone } from '@/generated/prisma/enums';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

export const browserTimezone = (): Timezone => {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const match = Object.values(Timezone).find(
    (timezone) => TimezoneLabel[timezone] === zone,
  );
  return match ?? Timezone.UTC;
};
