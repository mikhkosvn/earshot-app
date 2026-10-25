import {
  dehydrate,
  HydrationBoundary,
  noop,
  type QueryClient,
} from '@tanstack/react-query';
import { io } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ShellService } from '@/app/(app)/_service';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { prefetchEvaluatorOptions } from '@/app/(app)/test-case/_utils/prefetch-evaluator-options';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';

import { parseEvaluatorId } from '../_utils/parse-evaluator-id';
import { EditEvaluatorSkeleton } from './edit-evaluator-skeleton';
import { EditEvaluatorView } from './edit-evaluator-view';

type EditEvaluatorDataProps = {
  params: Promise<{ evaluatorId: string }>;
};

const prefetchAgentData = async (
  queryClient: QueryClient,
  projectId: number,
  evaluatorId: number,
) => {
  const detail = await queryClient
    .query({
      ...EvaluatorService.getEvaluatorQuery({ evaluatorId }),
      retry: false,
    })
    .catch(() => null);
  if (!detail?.agentId) return;
  const args = { projectId, agentId: detail.agentId };
  void queryClient
    .query({ ...EvaluatorService.getTestProfilesQuery(args), retry: false })
    .catch(noop);
  void queryClient
    .query({ ...EvaluatorService.getAgentDefaultsQuery(args), retry: false })
    .catch(noop);
};

export async function EditEvaluatorData({ params }: EditEvaluatorDataProps) {
  await io();

  const evaluatorId = parseEvaluatorId((await params).evaluatorId);
  if (evaluatorId === null) notFound();
  const queryClient = getQueryClient();
  const projectId = await queryClient.query({
    ...ShellService.getCurrentProjectIdQuery(),
    retry: false,
  });
  prefetchEvaluatorOptions(queryClient, projectId);
  void queryClient
    .query({
      ...EvaluatorService.getVersionsQuery({ evaluatorId }),
      retry: false,
    })
    .catch(noop);
  await prefetchAgentData(queryClient, projectId, evaluatorId);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<EditEvaluatorSkeleton />}>
          <EditEvaluatorView />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
