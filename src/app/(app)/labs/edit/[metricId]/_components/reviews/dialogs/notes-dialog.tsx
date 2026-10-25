'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { LabRowView } from '@/server/labs/types';

import { NotesForm } from './notes-form';

interface NotesDialogProps {
  row: LabRowView;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotesDialog({ row, open, onOpenChange }: NotesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="pr-6 text-base font-semibold">
            Notes
          </DialogTitle>
          <DialogDescription className="text-xs">
            Explain why the expected value is correct. Auto Improve reads these
            notes.
          </DialogDescription>
        </DialogHeader>
        <NotesForm row={row} onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
