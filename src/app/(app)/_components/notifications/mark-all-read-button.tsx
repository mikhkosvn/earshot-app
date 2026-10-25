'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { CheckCheckIcon } from 'lucide-react';

import { useMarkAllNotificationsReadMutation } from '@/app/(app)/_hooks/mutations/notifications/use-mark-all-notifications-read-mutation';
import { ShellService } from '@/app/(app)/_service';
import { Button } from '@/components/ui/button';

export function MarkAllReadButton() {
  const { data: unreadCount } = useSuspenseQuery(
    ShellService.getUnreadNotificationCountQuery(),
  );
  const markAllRead = useMarkAllNotificationsReadMutation();

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      disabled={unreadCount === 0 || markAllRead.isPending}
      className="text-xs text-muted-foreground hover:text-foreground"
      onClick={() => markAllRead.mutate()}
    >
      <CheckCheckIcon />
      Mark all read
    </Button>
  );
}
