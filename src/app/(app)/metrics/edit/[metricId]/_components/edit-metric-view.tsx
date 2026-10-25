'use client';

import { Suspense } from 'react';

import { ROLE_SUBTITLE } from '@/components/common/metric-form/_constants/metric-form-text';
import { PageHeader } from '@/components/common/page-header/page-header';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { CompareVersionsCard } from './compare/compare-versions-card';
import { EditMetricBreadcrumb } from './edit-metric-breadcrumb';
import { EditFormSkeleton } from './form/edit-form-skeleton';
import { EditMetricForm } from './form/edit-metric-form';
import { ChangeHistoryCard } from './history/change-history-card';
import { HistorySkeleton } from './history/history-skeleton';

export function EditMetricView() {
  return (
    <div className="flex flex-col gap-3">
      <EditMetricBreadcrumb />
      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-lg border bg-background px-3 py-2.5">
            <PageHeader
              title="Edit Metric"
              description={ROLE_SUBTITLE}
              className="[&_h1]:text-base"
            />
          </div>
          <QueryErrorBoundary>
            <Suspense fallback={<EditFormSkeleton />}>
              <EditMetricForm />
            </Suspense>
          </QueryErrorBoundary>
        </div>
        <QueryErrorBoundary>
          <Suspense fallback={<HistorySkeleton />}>
            <div className="flex flex-col gap-3 lg:sticky lg:top-3">
              <ChangeHistoryCard />
              <CompareVersionsCard />
            </div>
          </Suspense>
        </QueryErrorBoundary>
      </div>
    </div>
  );
}
