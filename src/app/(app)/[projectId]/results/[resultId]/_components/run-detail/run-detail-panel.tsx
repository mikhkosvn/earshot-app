'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { useRunDetailParam } from '../../../_hooks/use-run-detail-param';
import { RunDetailContent } from './run-detail-content';

export function RunDetailPanel() {
  const [runId, setRunId] = useRunDetailParam();

  return (
    <Dialog
      open={runId !== null}
      onOpenChange={(open) => {
        if (open) return;
        void setRunId(null);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[calc(100vw-4rem)]"
      >
        <DialogTitle className="sr-only">Run details</DialogTitle>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-96" />}>
            <RunDetailContent runId={runId} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
