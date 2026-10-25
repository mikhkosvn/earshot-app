'use client';

import { PlusIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateProjectForm } from './create-project-form';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="flex-row items-center gap-2 border-b px-3 py-2.5">
          <PlusIcon className="size-4 text-muted-foreground" />
          <DialogTitle className="text-sm font-semibold">
            Create new project
          </DialogTitle>
        </DialogHeader>
        <CreateProjectForm onCreated={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
