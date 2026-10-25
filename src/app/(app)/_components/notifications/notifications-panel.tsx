'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { MarkAllReadButton } from './mark-all-read-button';
import { NewNotificationsPill } from './new-notifications-pill';
import { NotificationList } from './notification-list';
import { NotificationListSkeleton } from './notification-list-skeleton';

interface NotificationsPanelProps {
  onNavigate: () => void;
}

export function NotificationsPanel({ onNavigate }: NotificationsPanelProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-2 border-b px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="text-xs font-semibold text-foreground">
            Notifications
          </span>
          <NewNotificationsPill />
        </div>
        <MarkAllReadButton />
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationList onNavigate={onNavigate} />
        </Suspense>
      </QueryErrorBoundary>
    </>
  );
}
