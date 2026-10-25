'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { useSharedRunParam } from '../../_hooks/use-shared-run-param';
import { SharedRunDialogContent } from './shared-run-dialog-content';

export function SharedRunDialog() {
  const { runId, closeRun } = useSharedRunParam();

  return (
    <Dialog
      open={runId !== null}
      onOpenChange={(open) => {
        if (open) return;
        void closeRun();
      }}
    >
      <DialogContent className="flex h-[95vh] max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[calc(100vw-4rem)]">
        <DialogTitle className="sr-only">Run details</DialogTitle>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-96" />}>
            <SharedRunDialogContent runId={runId} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
