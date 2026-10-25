'use client';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';

import { useMarkNotificationReadMutation } from '@/app/(app)/_hooks/mutations/notifications/use-mark-notification-read-mutation';
import { RelativeTime } from '@/components/common/relative-time';
import { Button } from '@/components/ui/button';
import type { NotificationItem } from '@/server/notifications/types';

import { NotificationUnreadDot } from './notification-unread-dot';

interface NotificationRowProps {
  notification: NotificationItem;
  onNavigate: () => void;
}

export function NotificationRow({
  notification,
  onNavigate,
}: NotificationRowProps) {
  const router = useRouter();
  const markRead = useMarkNotificationReadMutation();
  const isUnread = notification.readAt === null;

  const handleClick = () => {
    if (isUnread) markRead.mutate({ notificationId: notification.id });
    if (!notification.deepLink) return;
    onNavigate();
    router.push(notification.deepLink as Route);
  };

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      data-unread={isUnread}
      className="h-auto w-full items-start justify-start gap-2.5 rounded-none px-3 py-2.5 text-left font-normal whitespace-normal hover:bg-muted data-[unread=true]:bg-muted/50"
      onClick={handleClick}
    >
      <span className="mt-1.5 flex size-2 shrink-0 items-center justify-center">
        <NotificationUnreadDot isUnread={isUnread} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-xs font-semibold text-foreground">
          {notification.title}
        </span>
        <span className="mt-0.5 line-clamp-2 text-xs/5 text-muted-foreground">
          {notification.body}
        </span>
        <RelativeTime date={notification.createdAt} className="mt-1" />
      </span>
    </Button>
  );
}
