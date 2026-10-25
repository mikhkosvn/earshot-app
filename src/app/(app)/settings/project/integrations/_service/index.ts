import { queryOptions } from '@tanstack/react-query';

import { getNotificationSettingsAction } from '@/server/notification-settings/actions';

export const NotificationSettingsKey = {
  settings: 'project-notification-settings',
  update: 'update-project-notification-settings',
} as const;

export type NotificationSettingsKey =
  (typeof NotificationSettingsKey)[keyof typeof NotificationSettingsKey];

export class NotificationSettingsService {
  static readonly updateSettingsMutationKey = [NotificationSettingsKey.update];

  static getSettingsQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [NotificationSettingsKey.settings, args],
      queryFn: () => getNotificationSettingsAction(args),
    });
  }
}
