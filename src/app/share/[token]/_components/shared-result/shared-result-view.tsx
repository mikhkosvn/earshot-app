'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { SharedRunDialogPanel } from '../shared-run/shared-run-dialog-panel';
import { SharedRunsCard } from '../shared-runs/shared-runs-card';
import { SharedMetricsCard } from './metrics/shared-metrics-card';
import { SharedResultHeader } from './shared-result-header';
import { SharedResultScore } from './shared-result-score';

export function SharedResultView() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 p-4">
      <SharedResultHeader />
      <SharedResultScore />
      <SharedMetricsCard />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <SharedRunsCard />
        </Suspense>
      </QueryErrorBoundary>
      <SharedRunDialogPanel />
    </div>
  );
}
