'use client';

import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { CallListToolbar } from '../toolbar/call-list-toolbar';
import { CallTable } from '../call-table/call-table';
import { SelectedCallsBar } from './selected-calls-bar';

export function CallList() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <CallListToolbar />
      <SelectedCallsBar
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
      />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <CallTable
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelectedIds}
          />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
