'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export function NewNotificationsPill() {
  const { data: unreadCount } = useSuspenseQuery(
    ShellService.getUnreadNotificationCountQuery(),
  );

  if (unreadCount === 0) return null;

  return (
    <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      {unreadCount} new
    </span>
  );
}
