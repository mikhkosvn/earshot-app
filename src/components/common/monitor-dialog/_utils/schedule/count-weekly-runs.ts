import { listCronDates } from '@/lib/cron/list-cron-dates';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const MAX_RUNS_PER_WEEK = 7 * 24 * 60;

export const countWeeklyRuns = (
  expression: string,
  timeZone: string,
  from: Date,
) => {
  const end = from.getTime() + WEEK_MS;
  return listCronDates({
    expression,
    timeZone,
    from,
    count: MAX_RUNS_PER_WEEK,
  }).filter((date) => date.getTime() <= end).length;
};
