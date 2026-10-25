'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { MONITOR_DIALOG_SUBTITLE } from './_constants/monitor-dialog-text';
import type { MonitorPreset } from './_constants/monitor-preset';
import { CreateMonitorForm } from './create-monitor-form';
import { MonitorFormSkeleton } from './monitor-form-skeleton';

type CreateMonitorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentId?: number | null;
  evaluatorIds?: number[];
  preset?: MonitorPreset | null;
};

export function CreateMonitorDialog({
  open,
  onOpenChange,
  agentId,
  evaluatorIds,
  preset,
}: CreateMonitorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(90vh,56rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="gap-1 border-b px-4 py-3">
          <DialogTitle>Create monitor</DialogTitle>
          <DialogDescription>{MONITOR_DIALOG_SUBTITLE}</DialogDescription>
        </DialogHeader>
        <Suspense fallback={<MonitorFormSkeleton />}>
          <CreateMonitorForm
            key={String(open)}
            prefill={{ agentId, evaluatorIds, preset }}
            onCreated={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
