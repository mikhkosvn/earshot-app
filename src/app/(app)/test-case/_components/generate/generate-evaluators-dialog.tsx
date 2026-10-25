'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { GenerateEvaluatorsForm } from './generate-evaluators-form';

interface GenerateEvaluatorsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GenerateEvaluatorsDialog({
  open,
  onOpenChange,
}: GenerateEvaluatorsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Generate Evaluators</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="m-4 h-96" />}>
          <GenerateEvaluatorsForm onStarted={() => onOpenChange(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
