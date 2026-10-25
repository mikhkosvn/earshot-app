'use client';

import { CopyIcon } from 'lucide-react';
import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { DuplicateEvaluatorsForm } from './duplicate-evaluators-form';

type DuplicateEvaluatorsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
};

export function DuplicateEvaluatorsDialog({
  open,
  onOpenChange,
  evaluatorIds,
}: DuplicateEvaluatorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex-row items-center gap-2">
          <CopyIcon className="size-4 text-muted-foreground" />
          <DialogTitle>Duplicate scenarios</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <DuplicateEvaluatorsForm
            evaluatorIds={evaluatorIds}
            onDone={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
