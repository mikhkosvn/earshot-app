'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { LabRowView } from '@/server/labs/types';

import { ExpectedValueForm } from './expected-value-form';

type ExpectedValueDialogProps = {
  row: LabRowView;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ExpectedValueDialog({
  row,
  open,
  onOpenChange,
}: ExpectedValueDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="pr-6 text-base font-semibold">
            Expected Value
          </DialogTitle>
          <DialogDescription className="text-xs">
            Mark what should be the correct value
          </DialogDescription>
        </DialogHeader>
        <ExpectedValueForm row={row} onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
