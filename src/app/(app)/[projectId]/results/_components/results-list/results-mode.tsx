'use client';

import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { ResultsTable } from './table/results-table';
import { ResultsToolbar } from './toolbar/results-toolbar';

export function ResultsMode() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <ResultsToolbar
        selectedIds={selectedIds}
        onDeleted={() => setSelectedIds([])}
      />
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <ResultsTable
            selectedIds={selectedIds}
            onSelectedIdsChange={setSelectedIds}
          />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
}
