import { WebhookNotification } from '@/generated/prisma/enums';

export const WebhookNotificationLabel: Record<WebhookNotification, string> = {
  [WebhookNotification.result_pre_trigger]: 'Result Pre Trigger',
  [WebhookNotification.result_success]: 'Result Success',
  [WebhookNotification.result_failure]: 'Result Failure',
  [WebhookNotification.result_error]: 'Result Error',
  [WebhookNotification.cronjob_success]: 'Monitor Success',
  [WebhookNotification.cronjob_failure]: 'Monitor Failure',
  [WebhookNotification.cronjob_error]: 'Monitor Error',
  [WebhookNotification.call_log_success]: 'Call Log Success',
  [WebhookNotification.call_log_failure]: 'Call Log Failure',
  [WebhookNotification.call_log_reevaluated_success]:
    'Call Log Reevaluated Success',
  [WebhookNotification.call_log_reevaluated_failure]:
    'Call Log Reevaluated Failure',
  [WebhookNotification.daily_report]: 'Daily Report',
};
