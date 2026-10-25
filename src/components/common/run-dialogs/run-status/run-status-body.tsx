'use client';

import Link from 'next/link';
import { Suspense } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { CancelQueuedRunsButton } from './cancel-queued-runs-button';
import { RunStatusProgress } from './run-status-progress';

type RunStatusBodyProps = {
  resultId: number | null;
};

export function RunStatusBody({ resultId }: RunStatusBodyProps) {
  const projectId = useCurrentProjectId();
  if (resultId === null) return null;

  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">Run Initiated Successfully</h2>
        <p className="text-muted-foreground">
          Your runs have been started successfully.
        </p>
      </div>
      <QueryErrorBoundary>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <RunStatusProgress resultId={resultId} />
        </Suspense>
      </QueryErrorBoundary>
      <DialogFooter>
        <Suspense fallback={null}>
          <CancelQueuedRunsButton resultId={resultId} />
        </Suspense>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Close
        </DialogClose>
        <Button
          nativeButton={false}
          render={<Link href={UrlGenerator.result({ projectId, resultId })} />}
        >
          View Results
        </Button>
      </DialogFooter>
    </>
  );
}
