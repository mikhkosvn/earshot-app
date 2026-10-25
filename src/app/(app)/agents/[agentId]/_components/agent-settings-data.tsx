import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { AgentService } from '../../_service';
import { AgentSettingsForm } from './agent-settings-form';
import { AgentSettingsSkeleton } from './agent-settings-skeleton';

type AgentSettingsDataProps = {
  params: Promise<{ agentId: string }>;
};

export async function AgentSettingsData({ params }: AgentSettingsDataProps) {
  await io();

  const { agentId: rawAgentId } = await params;
  const agentId = parseProjectId(rawAgentId);
  if (!agentId) notFound();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...AgentService.getAgentQuery({ agentId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<AgentSettingsSkeleton />}>
          <AgentSettingsForm key={agentId} />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
