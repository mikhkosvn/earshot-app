'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BellIcon } from 'lucide-react';

import { ShellService } from '@/app/(app)/_service';
import { EmptyState } from '@/components/common/empty-state';

import { NotificationRow } from './notification-row';

interface NotificationListProps {
  onNavigate: () => void;
}

export function NotificationList({ onNavigate }: NotificationListProps) {
  const { data: notifications } = useSuspenseQuery(
    ShellService.getNotificationsQuery(),
  );

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={BellIcon}
        title="No notifications yet"
        description="Long-running jobs and alerts send notifications here."
      />
    );
  }

  return (
    <ul className="max-h-[calc(100dvh-9rem)] divide-y overflow-y-auto md:max-h-104">
      {notifications.map((notification) => (
        <li key={notification.id}>
          <NotificationRow
            notification={notification}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
