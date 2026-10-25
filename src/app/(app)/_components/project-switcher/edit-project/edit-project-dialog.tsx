'use client';

import { PencilIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { EditProjectForm } from './edit-project-form';

type EditProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditProjectDialog({
  open,
  onOpenChange,
}: EditProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="flex-row items-center gap-2 border-b px-3 py-2.5">
          <PencilIcon className="size-4 text-muted-foreground" />
          <DialogTitle className="text-sm font-semibold">
            Edit project
          </DialogTitle>
        </DialogHeader>
        <EditProjectForm onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
