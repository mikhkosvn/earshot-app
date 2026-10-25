'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateFolderForm } from './create-folder-form';

interface CreateFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parentPath: string | null;
}

export function CreateFolderDialog({
  open,
  onOpenChange,
  parentPath,
}: CreateFolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <CreateFolderForm
          parentPath={parentPath}
          onCreated={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
