import { WebhookNotification } from '@/generated/prisma/enums';

export type WebhookNotificationRowConfig = {
  notification: WebhookNotification;
  label: string;
  description: string;
};

export type WebhookNotificationGroupConfig = {
  title: string;
  rows: WebhookNotificationRowConfig[];
};

export const RESULT_NOTIFICATION_GROUPS: WebhookNotificationGroupConfig[] = [
  {
    title: 'Result Notifications',
    rows: [
      {
        notification: WebhookNotification.result_success,
        label: 'Success Notifications',
        description:
          'Send webhook notifications upon successful result (for simulations) completion',
      },
      {
        notification: WebhookNotification.result_failure,
        label: 'Failed Notifications',
        description:
          'Send webhook notifications upon failed result (for simulations) completion',
      },
      {
        notification: WebhookNotification.result_error,
        label: 'Error Notifications',
        description:
          'Send webhook notifications when all runs in a result have errors (e.g. call setup failures)',
      },
    ],
  },
  {
    title: 'Pre-run Notifications',
    rows: [
      {
        notification: WebhookNotification.result_pre_trigger,
        label: 'Pre-run Webhook',
        description:
          'Send a webhook at the start of a run, before any calls dispatch, to configure your external test sandbox (seed data, feature flags). The run waits for your endpoint to respond.',
      },
    ],
  },
  {
    title: 'Monitor Notifications',
    rows: [
      {
        notification: WebhookNotification.cronjob_success,
        label: 'Success Notifications',
        description:
          'Send webhook notifications when a monitor run completes successfully',
      },
      {
        notification: WebhookNotification.cronjob_failure,
        label: 'Failed Notifications',
        description: 'Send webhook notifications when a monitor run fails',
      },
      {
        notification: WebhookNotification.cronjob_error,
        label: 'Error Notifications',
        description:
          'Send webhook notifications when all runs in a monitor result have errors (e.g. call setup failures)',
      },
    ],
  },
];

export const CALL_LOG_NOTIFICATION_ROWS: WebhookNotificationRowConfig[] = [
  {
    notification: WebhookNotification.call_log_success,
    label: 'Success Notifications',
    description:
      'Send webhook notifications when a call log evaluation completes successfully',
  },
  {
    notification: WebhookNotification.call_log_failure,
    label: 'Failed Notifications',
    description: 'Send webhook notifications when a call log evaluation fails',
  },
];

export const DAILY_REPORT_NOTIFICATION_ROW: WebhookNotificationRowConfig = {
  notification: WebhookNotification.daily_report,
  label: 'Daily Report Notifications',
  description: 'Send webhook notifications for project daily reports',
};
