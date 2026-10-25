import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';

import { ShellService } from '@/app/(app)/_service';
import getQueryClient from '@/lib/query-client/get-query-client';

import { CreateAgentWizard } from './create-agent-wizard';

export async function CreateAgentData() {
  await io();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateAgentWizard />
    </HydrationBoundary>
  );
}
