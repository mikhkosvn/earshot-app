import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

import { loadRubricParams } from '../_constants/rubric-params';
import { RubricService } from '../_service';
import { RubricForm } from './rubric-form';
import { RubricSkeleton } from './rubric-skeleton';

interface RubricDataProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function RubricData({ searchParams }: RubricDataProps) {
  await io();

  const params = await loadRubricParams(searchParams);
  const queryClient = getQueryClient();
  const fallbackProjectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  const projectId = params[PROJECT_QUERY_KEY] ?? fallbackProjectId;
  void queryClient
    .query({ ...RubricService.getRubricQuery({ projectId }), retry: false })
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<RubricSkeleton />}>
          <RubricForm />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
