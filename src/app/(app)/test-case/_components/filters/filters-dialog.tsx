'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { FiltersForm } from './filters-form';

type FiltersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function FiltersDialog({ open, onOpenChange }: FiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-80 w-full" />}>
          <FiltersForm onDone={() => onOpenChange(false)} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
