type NotificationUnreadDotProps = {
  isUnread: boolean;
};

export function NotificationUnreadDot({
  isUnread,
}: NotificationUnreadDotProps) {
  if (!isUnread) return null;

  return (
    <span aria-label="Unread" className="size-2 rounded-full bg-green-500" />
  );
}
