'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { InsightCards } from './cards/insight-cards';
import { DeepResearchSection } from './deep-research/deep-research-section';
import { InsightsHeader } from './header/insights-header';
import { InsightsToolbar } from './header/insights-toolbar';

export function InsightsContent() {
  return (
    <div className="flex flex-col gap-3">
      <InsightsHeader />
      <InsightsToolbar />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <InsightCards />
        </Suspense>
      </QueryErrorBoundary>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <DeepResearchSection />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
