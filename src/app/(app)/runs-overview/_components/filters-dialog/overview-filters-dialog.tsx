'use client';

import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { OverviewFiltersForm } from './overview-filters-form';

type OverviewFiltersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OverviewFiltersDialog({
  open,
  onOpenChange,
}: OverviewFiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="h-[min(40rem,85vh)] gap-0 p-0 sm:max-w-2xl"
      >
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-96" />}>
            <OverviewFiltersForm onApplied={() => onOpenChange(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
