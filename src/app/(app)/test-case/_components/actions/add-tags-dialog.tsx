'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { AddTagsForm } from './add-tags-form';

interface AddTagsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
}

export function AddTagsDialog({
  open,
  onOpenChange,
  evaluatorIds,
}: AddTagsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Tags to Selected Scenarios</DialogTitle>
          <DialogDescription>Press Enter to add a tag.</DialogDescription>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-8 w-full" />}>
          <AddTagsForm
            evaluatorIds={evaluatorIds}
            onDone={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
