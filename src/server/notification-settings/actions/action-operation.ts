export const NotificationSettingsActionOperation = {
  getNotificationSettings: 'notification_settings.get_notification_settings',
  updateNotificationSettings:
    'notification_settings.update_notification_settings',
} as const;

export type NotificationSettingsActionOperation =
  (typeof NotificationSettingsActionOperation)[keyof typeof NotificationSettingsActionOperation];
