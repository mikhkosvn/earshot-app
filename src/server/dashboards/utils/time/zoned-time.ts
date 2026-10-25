import 'server-only';

import { WidgetTimePeriod } from '@/generated/prisma/enums';

export interface ZonedParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

const formatters = new Map<string, Intl.DateTimeFormat>();

const partsFormatter = (timeZone: string) => {
  const existing = formatters.get(timeZone);
  if (existing) return existing;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  formatters.set(timeZone, formatter);
  return formatter;
};

export const zonedParts = (date: Date, timeZone: string): ZonedParts => {
  const values = Object.fromEntries(
    partsFormatter(timeZone)
      .formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  );
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour % 24,
    minute: values.minute,
    second: values.second,
  };
};

const offsetMs = (date: Date, timeZone: string) => {
  const parts = zonedParts(date, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
};

export const zonedToUtc = (parts: ZonedParts, timeZone: string) => {
  const guess = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );
  const firstOffset = offsetMs(new Date(guess), timeZone);
  const first = guess - firstOffset;
  const secondOffset = offsetMs(new Date(first), timeZone);
  if (secondOffset === firstOffset) return new Date(first);
  return new Date(guess - secondOffset);
};

const civilDate = (parts: ZonedParts) =>
  new Date(Date.UTC(parts.year, parts.month - 1, parts.day));

const fromCivil = (date: Date, hour = 0): ZonedParts => ({
  year: date.getUTCFullYear(),
  month: date.getUTCMonth() + 1,
  day: date.getUTCDate(),
  hour,
  minute: 0,
  second: 0,
});

const mondayOffset = (date: Date) => (date.getUTCDay() + 6) % 7;

const bucketParts = (
  parts: ZonedParts,
  period: WidgetTimePeriod,
): ZonedParts => {
  const day = civilDate(parts);
  if (period === WidgetTimePeriod.hour) return fromCivil(day, parts.hour);
  if (period === WidgetTimePeriod.day) return fromCivil(day);
  if (period === WidgetTimePeriod.week) {
    day.setUTCDate(day.getUTCDate() - mondayOffset(day));
    return fromCivil(day);
  }
  day.setUTCDate(1);
  return fromCivil(day);
};

const nextBucketParts = (
  parts: ZonedParts,
  period: WidgetTimePeriod,
): ZonedParts => {
  const day = civilDate(parts);
  if (period === WidgetTimePeriod.hour) {
    const next = new Date(day.getTime() + (parts.hour + 1) * 3_600_000);
    return fromCivil(next, next.getUTCHours());
  }
  if (period === WidgetTimePeriod.day) {
    day.setUTCDate(day.getUTCDate() + 1);
    return fromCivil(day);
  }
  if (period === WidgetTimePeriod.week) {
    day.setUTCDate(day.getUTCDate() + 7);
    return fromCivil(day);
  }
  day.setUTCMonth(day.getUTCMonth() + 1);
  return fromCivil(day);
};

export const bucketStart = (
  date: Date,
  period: WidgetTimePeriod,
  timeZone: string,
) => zonedToUtc(bucketParts(zonedParts(date, timeZone), period), timeZone);

export const nextBucketStart = (
  start: Date,
  period: WidgetTimePeriod,
  timeZone: string,
) => zonedToUtc(nextBucketParts(zonedParts(start, timeZone), period), timeZone);

export const listBucketStarts = (
  from: Date,
  to: Date,
  period: WidgetTimePeriod,
  timeZone: string,
  limit: number,
) => {
  const starts: Date[] = [];
  let current = bucketStart(from, period, timeZone);
  while (current.getTime() <= to.getTime() && starts.length < limit) {
    starts.push(current);
    current = nextBucketStart(current, period, timeZone);
  }
  return starts;
};

export const zonedDayStart = (date: Date, timeZone: string) =>
  bucketStart(date, WidgetTimePeriod.day, timeZone);

export const zonedDateKey = (date: Date, timeZone: string) => {
  const parts = zonedParts(date, timeZone);
  return `${parts.year}-${String(parts.month).padStart(2, '0')}-${String(parts.day).padStart(2, '0')}`;
};
