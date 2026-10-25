'use client';

import { SettingsIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { ConfigureRunForm } from './configure-run-form';

interface ConfigureRunDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluatorIds: number[];
  onStarted: (resultId: number) => void;
}

export function ConfigureRunDialog({
  open,
  onOpenChange,
  evaluatorIds,
  onStarted,
}: ConfigureRunDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SettingsIcon className="size-4" />
            Configure Run
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ConfigureRunForm
              evaluatorIds={evaluatorIds}
              onStarted={onStarted}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
