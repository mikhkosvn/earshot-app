import { Suspense } from 'react';

import { AgentSettingsData } from './_components/agent-settings-data';
import { AgentSettingsSkeleton } from './_components/agent-settings-skeleton';

export default function AgentSettingsPage({
  params,
}: PageProps<'/agents/[agentId]'>) {
  return (
    <div className="p-3">
      <Suspense fallback={<AgentSettingsSkeleton />}>
        <AgentSettingsData params={params} />
      </Suspense>
    </div>
  );
}
