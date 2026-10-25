'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { useResultRunsArgs } from '../../../_hooks/runs/use-result-runs-args';
import { ResultRunsCardBody } from './result-runs-card-body';

export function ResultRunsCard() {
  const args = useResultRunsArgs();

  return (
    <QueryErrorBoundary>
      <Suspense fallback={<Skeleton className="h-72 w-full" />}>
        <ResultRunsCardBody key={JSON.stringify(args)} />
      </Suspense>
    </QueryErrorBoundary>
  );
}
