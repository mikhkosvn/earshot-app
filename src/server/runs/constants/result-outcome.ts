import {
  NotificationSeverity,
  WebhookNotification,
} from '@/generated/prisma/enums';

export const ResultOutcome = {
  success: 'success',
  failure: 'failure',
  error: 'error',
} as const;

export type ResultOutcome = (typeof ResultOutcome)[keyof typeof ResultOutcome];

export const RESULT_WEBHOOK_NOTIFICATION: Record<
  ResultOutcome,
  WebhookNotification
> = {
  [ResultOutcome.success]: WebhookNotification.result_success,
  [ResultOutcome.failure]: WebhookNotification.result_failure,
  [ResultOutcome.error]: WebhookNotification.result_error,
};

export const MONITOR_WEBHOOK_NOTIFICATION: Record<
  ResultOutcome,
  WebhookNotification
> = {
  [ResultOutcome.success]: WebhookNotification.cronjob_success,
  [ResultOutcome.failure]: WebhookNotification.cronjob_failure,
  [ResultOutcome.error]: WebhookNotification.cronjob_error,
};

export const RESULT_NOTIFICATION_SEVERITY: Record<
  ResultOutcome,
  NotificationSeverity
> = {
  [ResultOutcome.success]: NotificationSeverity.success,
  [ResultOutcome.failure]: NotificationSeverity.warning,
  [ResultOutcome.error]: NotificationSeverity.error,
};
