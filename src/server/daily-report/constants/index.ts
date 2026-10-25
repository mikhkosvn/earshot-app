export const DAILY_REPORT_HOUR = 17;

export const DAILY_REPORT_TASK_INTERVAL_MS = 60_000;

export const DAILY_REPORT_WINDOW_MS = 24 * 3_600_000;

export const DAILY_REPORT_HOUR_LABEL = '5:00 PM';

export const DailyReportOutcome = {
  sent: 'sent',
  alreadySent: 'already_sent',
  notDue: 'not_due',
} as const;

export type DailyReportOutcome =
  (typeof DailyReportOutcome)[keyof typeof DailyReportOutcome];
