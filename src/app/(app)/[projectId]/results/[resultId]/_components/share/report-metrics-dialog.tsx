'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ReportMetricsDialogBody } from './report-metrics-dialog-body';

interface ReportMetricsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportMetricsDialog({
  open,
  onOpenChange,
}: ReportMetricsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Select Metrics for Report</DialogTitle>
        </DialogHeader>
        <ReportMetricsDialogBody onDownloaded={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
