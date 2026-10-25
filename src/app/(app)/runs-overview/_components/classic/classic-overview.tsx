'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { OverviewBody } from './overview-body';
import { OverviewBodySkeleton } from './overview-body-skeleton';
import { OverviewToolbar } from './toolbar/overview-toolbar';

export function ClassicOverview() {
  return (
    <div className="flex flex-col gap-3">
      <OverviewToolbar />
      <QueryErrorBoundary>
        <Suspense fallback={<OverviewBodySkeleton />}>
          <OverviewBody />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
