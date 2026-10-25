'use client';

import { Suspense } from 'react';

import { ChangeHistoryCard } from '@/components/common/metric-history/change-history-card';
import { HistorySkeleton } from '@/components/common/metric-history/history-skeleton';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';

import { LabEditorForm } from './lab-editor-form';

export function LabEditorView() {
  return (
    <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_300px]">
      <LabEditorForm />
      <QueryErrorBoundary>
        <Suspense fallback={<HistorySkeleton />}>
          <div className="lg:sticky lg:top-3">
            <ChangeHistoryCard />
          </div>
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
