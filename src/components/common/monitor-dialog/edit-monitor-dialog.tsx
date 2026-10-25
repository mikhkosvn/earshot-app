'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EDIT_MONITOR_SUBTITLE } from './_constants/monitor-dialog-text';
import { EditMonitorForm } from './edit-monitor-form';
import { MonitorFormSkeleton } from './monitor-form-skeleton';

interface EditMonitorDialogProps {
  monitorId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMonitorDialog({
  monitorId,
  open,
  onOpenChange,
}: EditMonitorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(90vh,56rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="gap-1 border-b px-4 py-3">
          <DialogTitle>Edit monitor</DialogTitle>
          <DialogDescription>{EDIT_MONITOR_SUBTITLE}</DialogDescription>
        </DialogHeader>
        <Suspense fallback={<MonitorFormSkeleton />}>
          <EditMonitorForm
            key={String(open)}
            monitorId={monitorId}
            onSaved={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
