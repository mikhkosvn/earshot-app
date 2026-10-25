'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MetricListItem } from '@/server/metrics/types';

import { ManageMetricForm } from './manage-metric-form';

interface ManageMetricDialogProps {
  metric: MetricListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ManageMetricDialog({
  metric,
  open,
  onOpenChange,
}: ManageMetricDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="pr-6 text-base font-semibold">
            Manage Metric for {metric.name}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select which agents this metric should be enabled for
          </DialogDescription>
        </DialogHeader>
        <ManageMetricForm metric={metric} onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
