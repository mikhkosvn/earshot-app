import { Suspense } from 'react';

import { PageHeader } from '@/components/common/page-header/page-header';

import { AgentsData } from './_components/agent-list/agents-data';
import { AgentsTableSkeleton } from './_components/agent-list/agents-table-skeleton';
import { AgentsToolbar } from './_components/agent-list/agents-toolbar';

export default function AgentsPage({ searchParams }: PageProps<'/agents'>) {
  return (
    <div className="flex flex-col gap-3 p-3">
      <PageHeader
        title="Agents"
        description="Agents are the configurations you set up in Earshot, describing the agent you want to test along with how it connects, so you can generate evaluators and run simulations against it."
      />
      <Suspense fallback={null}>
        <AgentsToolbar />
      </Suspense>
      <Suspense fallback={<AgentsTableSkeleton />}>
        <AgentsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
