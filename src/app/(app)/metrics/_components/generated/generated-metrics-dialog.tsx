'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { useGenerationParam } from '../../_hooks/use-generation-param';
import { GeneratedMetricsBody } from './generated-metrics-body';

export function GeneratedMetricsDialog() {
  const { jobId, clearGeneration } = useGenerationParam();

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    void clearGeneration();
  };

  return (
    <Dialog open={Boolean(jobId)} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[calc(100vh-4rem)] flex-col gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="text-base font-semibold">
            Generated Project Metrics
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select the metrics you want to save for your project.
          </DialogDescription>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-3 h-60" />}>
            <GeneratedMetricsBody
              jobId={jobId}
              onSaved={() => handleOpenChange(false)}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
