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

import type { ReevaluateTarget } from '../../_utils/runs/reevaluate-targets';
import { ReevaluateMetricsForm } from './reevaluate-metrics-form';

export type { ReevaluateTarget };

type ReevaluateMetricsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targets: ReevaluateTarget[];
};

export function ReevaluateMetricsDialog({
  open,
  onOpenChange,
  targets,
}: ReevaluateMetricsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(85vh,40rem)] flex-col sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Reevaluate Metrics</DialogTitle>
          <DialogDescription>
            Select the metrics you want to reevaluate for the chosen runs.
          </DialogDescription>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <ReevaluateMetricsForm
              key={String(open)}
              targets={targets}
              onDone={() => onOpenChange(false)}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
