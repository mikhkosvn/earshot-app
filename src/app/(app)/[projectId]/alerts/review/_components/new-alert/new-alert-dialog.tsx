'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { NewAlertForm } from './new-alert-form';

type NewAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewAlertDialog({ open, onOpenChange }: NewAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            New alert
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-32 w-full" />}>
            <NewAlertForm onCreated={() => onOpenChange(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
