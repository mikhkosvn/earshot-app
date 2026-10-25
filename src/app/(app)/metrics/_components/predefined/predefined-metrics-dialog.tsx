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

import { PredefinedMetricsContent } from './predefined-metrics-content';

type PredefinedMetricsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PredefinedMetricsDialog({
  open,
  onOpenChange,
}: PredefinedMetricsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[calc(100vh-5rem)] max-h-185 flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="gap-1 px-3 pt-3 pb-2">
          <DialogTitle className="text-base font-semibold">
            Predefined Metrics
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select from our predefined metrics to get started quickly.
          </DialogDescription>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-3 flex-1" />}>
            <PredefinedMetricsContent onCreated={() => onOpenChange(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
