import { Suspense } from 'react';

import { SettingsPageContainer } from '@/app/(app)/settings/_components/settings-page-container';

import { KnowledgeData } from './_components/knowledge-data';
import { KnowledgeSkeleton } from './_components/knowledge-skeleton';

export default function AgentKnowledgePage() {
  return (
    <SettingsPageContainer>
      <Suspense fallback={<KnowledgeSkeleton />}>
        <KnowledgeData />
      </Suspense>
    </SettingsPageContainer>
  );
}
