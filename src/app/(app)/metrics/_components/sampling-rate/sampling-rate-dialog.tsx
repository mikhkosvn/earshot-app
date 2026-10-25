'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MetricListItem } from '@/server/metrics/types';

import { SamplingRateForm } from './sampling-rate-form';

interface SamplingRateDialogProps {
  metric: MetricListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SamplingRateDialog({
  metric,
  open,
  onOpenChange,
}: SamplingRateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="pr-6 text-base font-semibold">
            Sampling rate for {metric.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Percentage of calls to evaluate (0-100). Leave the field empty to
            use the project sampling rate.
          </DialogDescription>
        </DialogHeader>
        <SamplingRateForm metric={metric} onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
