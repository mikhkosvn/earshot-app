'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Skeleton } from '@/components/ui/skeleton';

import { AlertFilterRow } from './alert-filter-row';
import { AlertsTable } from './alerts-table';

export function ConfiguredAlertsCard() {
  return (
    <section className="flex flex-col rounded-lg border bg-background">
      <header className="flex flex-col gap-0.5 border-b px-3 py-2.5">
        <h2 className="text-xs font-semibold">All configured alerts</h2>
        <p className="text-[11px] text-muted-foreground">
          Configure alert types and filters inline.
        </p>
      </header>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="m-3 h-40" />}>
          <AlertFilterRow />
          <AlertsTable />
        </Suspense>
      </QueryErrorBoundary>
    </section>
  );
}
