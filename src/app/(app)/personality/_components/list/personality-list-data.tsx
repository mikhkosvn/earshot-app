import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

import { loadPersonalityListParams } from '../../_constants/personality-list-params';
import { PersonalityService } from '../../_service';
import { PersonalityGrid } from './personality-grid';
import { PersonalityGridSkeleton } from './personality-grid-skeleton';
import { PersonalityToolbar } from './toolbar/personality-toolbar';

interface PersonalityListDataProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function PersonalityListData({
  searchParams,
}: PersonalityListDataProps) {
  await io();

  const params = await loadPersonalityListParams(searchParams);
  const queryClient = getQueryClient();
  const projectId =
    params[PROJECT_QUERY_KEY] ??
    (await queryClient.query({
      ...ShellService.getCurrentProjectIdQuery(),
      retry: false,
    }));
  void queryClient
    .query({
      ...PersonalityService.getListQuery({
        projectId,
        language: params.language,
      }),
      retry: false,
    })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-3">
        <PersonalityToolbar />
        <QueryErrorBoundary>
          <Suspense fallback={<PersonalityGridSkeleton />}>
            <PersonalityGrid />
          </Suspense>
        </QueryErrorBoundary>
      </div>
    </HydrationBoundary>
  );
}
