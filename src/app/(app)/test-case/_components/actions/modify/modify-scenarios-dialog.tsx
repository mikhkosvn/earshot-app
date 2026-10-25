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

import { ModifyScenariosForm } from './modify-scenarios-form';

type ModifyScenariosDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
};

export function ModifyScenariosDialog({
  open,
  onOpenChange,
  evaluatorIds,
}: ModifyScenariosDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Advanced Scenarios Edit</DialogTitle>
          <DialogDescription>
            Update metrics, personality, and instructions for selected scenarios
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <ModifyScenariosForm
            evaluatorIds={evaluatorIds}
            onDone={() => onOpenChange(false)}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
