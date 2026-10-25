'use client';

import { FileJsonIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { RunFromFileForm } from './run-from-file-form';

type RunFromFileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStarted: (resultId: number) => void;
};

export function RunFromFileDialog({
  open,
  onOpenChange,
  onStarted,
}: RunFromFileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJsonIcon className="size-4" />
            Run a test suite from a file
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-80 w-full" />}>
            <RunFromFileForm onStarted={onStarted} />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
