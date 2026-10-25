import 'server-only';

import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import type { NotificationSettings } from '@/server/notification-settings/types';

const KIND_SETTING: Record<
  Exclude<EmailNotificationKind, typeof EmailNotificationKind.alert>,
  keyof NotificationSettings
> = {
  [EmailNotificationKind.monitorFailure]: 'notifyMonitorFailure',
  [EmailNotificationKind.monitorSuccess]: 'notifyMonitorSuccess',
  [EmailNotificationKind.resultsCompletion]: 'notifyResultsCompletion',
  [EmailNotificationKind.dailyReport]: 'notifyDailyReport',
  [EmailNotificationKind.dailyReportNoCalls]: 'notifyDailyReportNoCalls',
  [EmailNotificationKind.noCalls]: 'notifyNoCalls',
  [EmailNotificationKind.frequentCalls]: 'notifyFrequentCalls',
};

export const isEmailKindEnabled = (
  settings: NotificationSettings,
  kind: EmailNotificationKind,
) => {
  if (kind === EmailNotificationKind.alert) return true;
  return settings[KIND_SETTING[kind]];
};
