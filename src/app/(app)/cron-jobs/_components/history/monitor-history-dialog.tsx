'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { MonitorListItem } from '@/server/monitors/types';

import { MonitorRunList } from './monitor-run-list';

type MonitorHistoryDialogProps = {
  monitor: MonitorListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MonitorHistoryDialog({
  monitor,
  open,
  onOpenChange,
}: MonitorHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Run history</DialogTitle>
          <DialogDescription className="truncate">
            {monitor.name}
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <MonitorRunList monitorId={monitor.id} timezone={monitor.timezone} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
