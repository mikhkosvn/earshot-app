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

import { UseAsEvaluatorForm } from './use-as-evaluator-form';

interface UseAsEvaluatorDialogProps {
  callLogIds: number[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UseAsEvaluatorDialog({
  callLogIds,
  open,
  onOpenChange,
}: UseAsEvaluatorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            Use as evaluator
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <UseAsEvaluatorForm
              callLogIds={callLogIds}
              onStarted={() => onOpenChange(false)}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
