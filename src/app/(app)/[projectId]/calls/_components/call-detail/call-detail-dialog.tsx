'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { useCallIdParam } from '../../_hooks/call-params/use-call-id-param';
import { CallDetailContent } from './call-detail-content';

export function CallDetailDialog() {
  const { callId, closeCall } = useCallIdParam();

  return (
    <Dialog
      open={callId !== null}
      onOpenChange={(open) => {
        if (open) return;
        void closeCall();
      }}
    >
      <DialogContent className="flex h-[95vh] max-w-[calc(100vw-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[calc(100vw-4rem)]">
        <DialogTitle className="sr-only">Call details</DialogTitle>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-96" />}>
            <CallDetailContent callLogId={callId} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
