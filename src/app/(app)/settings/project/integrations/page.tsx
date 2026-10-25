import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { NotificationsData } from './_components/notifications-data';
import { NotificationsSkeleton } from './_components/notifications-skeleton';

export default function ProjectNotificationsPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationsData />
      </Suspense>
    </SettingsPageContainer>
  );
}
