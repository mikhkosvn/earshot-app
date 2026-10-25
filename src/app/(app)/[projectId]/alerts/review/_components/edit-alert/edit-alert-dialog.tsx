'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { AlertRow } from '@/server/alerts/types';

import { EditAlertForm } from './edit-alert-form';

type EditAlertDialogProps = {
  alert: AlertRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditAlertDialog({
  alert,
  open,
  onOpenChange,
}: EditAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Edit alert
          </DialogTitle>
        </DialogHeader>
        <EditAlertForm alert={alert} onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
