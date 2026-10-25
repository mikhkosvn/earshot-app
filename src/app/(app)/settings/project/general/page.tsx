import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { ProjectGeneralData } from './_components/project-general-data';
import { ProjectGeneralSkeleton } from './_components/project-general-skeleton';

export default function ProjectGeneralPage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<ProjectGeneralSkeleton />}>
        <ProjectGeneralData />
      </Suspense>
    </SettingsPageContainer>
  );
}
