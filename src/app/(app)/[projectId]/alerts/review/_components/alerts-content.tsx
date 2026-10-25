'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { ConfiguredAlertsCard } from './configured/configured-alerts-card';
import { AlertsHeader } from './header/alerts-header';
import { AlertReviewSection } from './review/alert-review-section';

export function AlertsContent() {
  return (
    <div className="flex flex-col gap-3">
      <AlertsHeader />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-136 w-full" />}>
          <AlertReviewSection />
        </Suspense>
      </QueryErrorBoundary>
      <ConfiguredAlertsCard />
    </div>
  );
}
