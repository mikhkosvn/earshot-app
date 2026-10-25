'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';

export function NotificationsBadge() {
  const { data: unreadCount } = useSuspenseQuery(
    ShellService.getUnreadNotificationCountQuery(),
  );

  if (unreadCount === 0) return null;

  return (
    <span
      aria-hidden
      className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] leading-none font-semibold text-white ring-2 ring-background"
    >
      {unreadCount}
    </span>
  );
}
