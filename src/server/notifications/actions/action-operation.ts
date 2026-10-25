export const NotificationsActionOperation = {
  listNotifications: 'notifications.list_notifications',
  countUnreadNotifications: 'notifications.count_unread_notifications',
  markNotificationRead: 'notifications.mark_notification_read',
  markAllNotificationsRead: 'notifications.mark_all_notifications_read',
} as const;

export type NotificationsActionOperation =
  (typeof NotificationsActionOperation)[keyof typeof NotificationsActionOperation];
