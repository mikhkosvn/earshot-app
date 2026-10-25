'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ExportCallsForm } from './export-calls-form';

type ExportCallsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ExportCallsDialog({
  open,
  onOpenChange,
}: ExportCallsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Export Call Logs
          </DialogTitle>
        </DialogHeader>
        <ExportCallsForm onStarted={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
