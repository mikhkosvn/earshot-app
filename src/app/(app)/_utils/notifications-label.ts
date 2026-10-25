export const getNotificationsLabel = (unreadCount: number) => {
  if (unreadCount === 0) return 'Notifications';
  return `Notifications (${unreadCount} unread)`;
};
