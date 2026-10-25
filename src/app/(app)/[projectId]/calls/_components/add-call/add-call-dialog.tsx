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

import { AddCallForm } from './add-call-form';

interface AddCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCallDialog({ open, onOpenChange }: AddCallDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Create call
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <AddCallForm onCreated={() => onOpenChange(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
