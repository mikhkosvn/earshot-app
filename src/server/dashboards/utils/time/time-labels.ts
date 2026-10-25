import 'server-only';

import { WidgetTimePeriod } from '@/generated/prisma/enums';

const HOUR_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
};

const DAY_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
};

const MONTH_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  year: 'numeric',
};

const PERIOD_OPTIONS: Record<WidgetTimePeriod, Intl.DateTimeFormatOptions> = {
  [WidgetTimePeriod.hour]: HOUR_OPTIONS,
  [WidgetTimePeriod.day]: DAY_OPTIONS,
  [WidgetTimePeriod.week]: DAY_OPTIONS,
  [WidgetTimePeriod.month]: MONTH_OPTIONS,
};

export const bucketLabel = (
  start: Date,
  period: WidgetTimePeriod,
  timeZone: string,
) =>
  new Intl.DateTimeFormat('en-US', {
    ...PERIOD_OPTIONS[period],
    timeZone,
  }).format(start);

export const pointLabel = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', { ...HOUR_OPTIONS, timeZone }).format(date);

export const reportDateLabel = (date: Date, timeZone: string) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(date);
