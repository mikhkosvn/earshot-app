export const EmailNotificationKind = {
  monitorFailure: 'monitor_failure',
  monitorSuccess: 'monitor_success',
  resultsCompletion: 'results_completion',
  dailyReport: 'daily_report',
  dailyReportNoCalls: 'daily_report_no_calls',
  noCalls: 'no_calls',
  frequentCalls: 'frequent_calls',
  alert: 'alert',
} as const;

export type EmailNotificationKind =
  (typeof EmailNotificationKind)[keyof typeof EmailNotificationKind];

export const EmailSkipReason = {
  emailDisabled: 'email_disabled',
  kindDisabled: 'kind_disabled',
  noRecipients: 'no_recipients',
} as const;

export type EmailSkipReason =
  (typeof EmailSkipReason)[keyof typeof EmailSkipReason];
