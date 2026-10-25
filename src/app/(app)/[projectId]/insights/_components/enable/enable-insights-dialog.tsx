'use client';

import { LightbulbIcon } from 'lucide-react';
import { Suspense } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { EnableInsightsForm } from './enable-insights-form';

interface EnableInsightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMetricId: number | null;
}

export function EnableInsightsDialog({
  open,
  onOpenChange,
  initialMetricId,
}: EnableInsightsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <LightbulbIcon className="size-4" />
            Enable insights for a metric
          </DialogTitle>
        </DialogHeader>
        <QueryErrorBoundary>
          <Suspense fallback={<Skeleton className="h-48 w-full" />}>
            <EnableInsightsForm
              initialMetricId={initialMetricId}
              onSaved={() => onOpenChange(false)}
            />
          </Suspense>
        </QueryErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
