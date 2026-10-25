'use client';

import { FileSpreadsheetIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ExportEvaluatorsForm } from './export-evaluators-form';

type ExportEvaluatorsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
};

export function ExportEvaluatorsDialog({
  open,
  onOpenChange,
  evaluatorIds,
}: ExportEvaluatorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-center gap-2">
          <FileSpreadsheetIcon className="size-4 text-muted-foreground" />
          <DialogTitle>Export scenarios</DialogTitle>
        </DialogHeader>
        <ExportEvaluatorsForm
          evaluatorIds={evaluatorIds}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
