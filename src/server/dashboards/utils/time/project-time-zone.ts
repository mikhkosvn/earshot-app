import 'server-only';

import type { Timezone } from '@/generated/prisma/enums';
import { TimezoneLabel } from '@/server/monitors/constants/timezone-labels';

export const projectTimeZone = (timezone: Timezone) => TimezoneLabel[timezone];
