import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';

import { ShellService } from '@/app/(app)/_service';
import getQueryClient from '@/lib/query-client/get-query-client';

import { CreatePersonalityForm } from './create-personality-form';

export async function CreatePersonalityData() {
  await io();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreatePersonalityForm />
    </HydrationBoundary>
  );
}
