'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ResultListRow } from '@/server/results/types';

import { RenameResultForm } from './rename-result-form';

type RenameResultDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ResultListRow;
};

export function RenameResultDialog({
  open,
  onOpenChange,
  result,
}: RenameResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Result</DialogTitle>
        </DialogHeader>
        <RenameResultForm
          result={result}
          onRenamed={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
