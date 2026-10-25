import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { TelephonyBreadcrumb } from './_components/telephony-breadcrumb';
import { TelephonyData } from './_components/telephony-data';
import { TelephonySkeleton } from './_components/telephony-skeleton';

export default function TelephonyPage() {
  return (
    <SettingsPageContainer>
      <TelephonyBreadcrumb />
      <Suspense fallback={<TelephonySkeleton />}>
        <TelephonyData />
      </Suspense>
    </SettingsPageContainer>
  );
}
