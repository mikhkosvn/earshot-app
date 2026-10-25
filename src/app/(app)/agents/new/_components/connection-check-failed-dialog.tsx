'use client';

import { CircleAlertIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ConnectionCheckFailedDialogProps = {
  message: string | null;
  onClose: () => void;
  onCreateAnyway: () => void;
};

export function ConnectionCheckFailedDialog({
  message,
  onClose,
  onCreateAnyway,
}: ConnectionCheckFailedDialogProps) {
  return (
    <Dialog
      open={message !== null}
      onOpenChange={(open) => {
        if (open) return;
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Something went wrong</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
          <p>{message}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Try again
          </Button>
          <Button type="button" onClick={onCreateAnyway}>
            Create anyway
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
