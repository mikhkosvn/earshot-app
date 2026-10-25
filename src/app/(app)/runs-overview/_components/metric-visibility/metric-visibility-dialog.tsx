'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { MetricVisibilityList } from './metric-visibility-list';

interface MetricVisibilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MetricVisibilityDialog({
  open,
  onOpenChange,
}: MetricVisibilityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Metric visibility</DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-24" />}>
            <MetricVisibilityList />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
