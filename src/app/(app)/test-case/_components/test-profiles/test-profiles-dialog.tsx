'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { TestProfilesBrowser } from './list/test-profiles-browser';

interface TestProfilesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestProfilesDialog({
  open,
  onOpenChange,
}: TestProfilesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] gap-3 sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Test Profiles</DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <TestProfilesBrowser />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
