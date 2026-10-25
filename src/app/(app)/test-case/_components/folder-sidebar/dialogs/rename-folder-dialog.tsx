'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { FolderView } from '@/server/folders/types';

import { RenameFolderForm } from './rename-folder-form';

type RenameFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder: FolderView;
};

export function RenameFolderDialog({
  open,
  onOpenChange,
  folder,
}: RenameFolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
        </DialogHeader>
        <RenameFolderForm
          folder={folder}
          onRenamed={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
