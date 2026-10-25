import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { parseProjectId } from '@/app/(app)/_utils/parse-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import getQueryClient from '@/lib/query-client/get-query-client';

import { PersonalityService } from '../../../_service';
import { EditPersonalityForm } from './edit-personality-form';

type EditPersonalityDataProps = {
  params: Promise<{ personalityId: string }>;
};

export async function EditPersonalityData({
  params,
}: EditPersonalityDataProps) {
  await io();

  const { personalityId: rawId } = await params;
  const personalityId = parseProjectId(rawId);
  if (!personalityId) notFound();

  const queryClient = getQueryClient();
  void queryClient
    .query({ ...ShellService.getCurrentProjectIdQuery(), retry: false })
    .catch(noop);
  void queryClient
    .query({
      ...PersonalityService.getPersonalityQuery({ personalityId }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-150 w-full" />}>
          <EditPersonalityForm />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
