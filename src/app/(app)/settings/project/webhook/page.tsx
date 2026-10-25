import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { WebhookData } from './_components/webhook-data';
import { WebhookSkeleton } from './_components/webhook-skeleton';

export default function WebhookSettingsPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<WebhookSkeleton />}>
        <WebhookData />
      </Suspense>
    </SettingsPageContainer>
  );
}
