'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { MoveToFolderForm } from './move-to-folder-form';

type MoveToFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
  onMoved: () => void;
};

export function MoveToFolderDialog({
  open,
  onOpenChange,
  evaluatorIds,
  onMoved,
}: MoveToFolderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move to folder</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <MoveToFolderForm
            evaluatorIds={evaluatorIds}
            onMoved={() => {
              onOpenChange(false);
              onMoved();
            }}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
