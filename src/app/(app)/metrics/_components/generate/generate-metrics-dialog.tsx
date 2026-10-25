'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { GENERATED_METRIC_COUNT } from '@/server/metrics/constants/definition/metric-limits';

import { GenerateMetricsForm } from './generate-metrics-form';

type GenerateMetricsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function GenerateMetricsDialog({
  open,
  onOpenChange,
}: GenerateMetricsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 p-6 sm:max-w-md">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-lg font-semibold">
            Generate Metrics
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select an agent to generate {GENERATED_METRIC_COUNT} metrics
            automatically using AI.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-24 w-full" />}>
          <GenerateMetricsForm onStarted={() => onOpenChange(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
