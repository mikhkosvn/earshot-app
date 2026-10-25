import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { io } from 'next/cache';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import getQueryClient from '@/lib/query-client/get-query-client';
import { shareTokenSchema } from '@/server/share-links/schemas';

import { loadShareParams } from '../_constants/share-params';
import { ShareService } from '../_service';
import { prefetchSharedTarget } from '../_utils/prefetch-shared-target';
import { InvalidShareLink } from './invalid-share-link';
import { ShareContent } from './share-content';
import { SharePageSkeleton } from './share-page-skeleton';

type ShareDataProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function ShareData({ params, searchParams }: ShareDataProps) {
  await io();

  const parsedToken = shareTokenSchema.safeParse((await params).token);
  if (!parsedToken.success) return <InvalidShareLink />;
  const token = parsedToken.data;
  const query = await loadShareParams(searchParams);
  const queryClient = getQueryClient();
  const view = await queryClient.query({
    ...ShareService.getViewQuery({ token }),
    retry: false,
  });
  if (!view) return <InvalidShareLink />;
  await prefetchSharedTarget(queryClient, token, view, query);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryErrorBoundary>
        <Suspense fallback={<SharePageSkeleton />}>
          <ShareContent />
        </Suspense>
      </QueryErrorBoundary>
    </HydrationBoundary>
  );
}
