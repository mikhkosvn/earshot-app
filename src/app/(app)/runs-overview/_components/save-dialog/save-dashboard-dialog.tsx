'use client';

import { SaveIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { SaveDashboardForm } from './save-dashboard-form';

interface SaveDashboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveDashboardDialog({
  open,
  onOpenChange,
}: SaveDashboardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b px-4 py-3">
          <DialogTitle className="flex items-center gap-2 text-base">
            <SaveIcon className="size-4" />
            Save dashboard
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="m-4 h-64" />}>
            <SaveDashboardForm onDone={() => onOpenChange(false)} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
