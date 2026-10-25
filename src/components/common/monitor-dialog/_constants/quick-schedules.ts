export interface QuickSchedule {
  cron: string;
  label: string;
}

export const QUICK_SCHEDULES: QuickSchedule[] = [
  {
    cron: '0 */12 * * *',
    label: 'Every 12 Hours (Runs twice a day at 12-hour intervals)',
  },
  {
    cron: '0 */6 * * *',
    label: 'Every 6 Hours (Runs four times a day at 6-hour intervals)',
  },
  {
    cron: '0 */3 * * *',
    label: 'Every 3 Hours (Runs eight times a day at 3-hour intervals)',
  },
  { cron: '0 * * * *', label: 'Every Hour (Runs once every hour)' },
  { cron: '*/30 * * * *', label: 'Every 30 Minutes (Runs twice every hour)' },
  {
    cron: '*/15 * * * *',
    label: 'Every 15 Minutes (Runs four times every hour)',
  },
  {
    cron: '*/5 * * * *',
    label: 'Every 5 Minutes (Runs twelve times every hour)',
  },
  { cron: '* * * * *', label: 'Every Minute (Runs every minute)' },
  {
    cron: '0 0 * * *',
    label: 'Daily at Midnight (Runs once a day at midnight)',
  },
  {
    cron: '0 0 * * 1',
    label: 'Weekly on Monday (Runs once a week on Monday at midnight)',
  },
  {
    cron: '0 0 1 * *',
    label: 'Monthly on 1st (Runs once a month on the 1st at midnight)',
  },
];
