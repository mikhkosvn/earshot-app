'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EDIT_MONITOR_SUBTITLE } from './_constants/monitor-dialog-text';
import { EditMonitorDialogBody } from './edit-monitor-dialog-body';

type EditMonitorDialogProps = {
  monitorId: number | null;
  onClose: () => void;
};

export function EditMonitorDialog({
  monitorId,
  onClose,
}: EditMonitorDialogProps) {
  return (
    <Dialog
      open={monitorId !== null}
      onOpenChange={(open) => {
        if (open) return;
        onClose();
      }}
    >
      <DialogContent className="flex max-h-[min(90vh,56rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="gap-1 border-b px-4 py-3">
          <DialogTitle>Edit monitor</DialogTitle>
          <DialogDescription>{EDIT_MONITOR_SUBTITLE}</DialogDescription>
        </DialogHeader>
        <EditMonitorDialogBody monitorId={monitorId} onSaved={onClose} />
      </DialogContent>
    </Dialog>
  );
}
