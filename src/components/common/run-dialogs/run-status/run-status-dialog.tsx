'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { RunStatusBody } from './run-status-body';

interface RunStatusDialogProps {
  resultId: number | null;
  onClose: () => void;
}

export function RunStatusDialog({ resultId, onClose }: RunStatusDialogProps) {
  return (
    <Dialog
      open={resultId !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Run Status</DialogTitle>
        </DialogHeader>
        <RunStatusBody resultId={resultId} />
      </DialogContent>
    </Dialog>
  );
}
