'use client';

import { Suspense } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { TestProfileView } from '@/server/test-profiles/types';

import { TestProfileDialogTitle } from './test-profile-dialog-title';
import { TestProfileForm } from './test-profile-form';

type TestProfileFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: TestProfileView | null;
  defaultAgentId?: number | null;
  onSaved?: (profileId: number) => void;
};

export function TestProfileFormDialog({
  open,
  onOpenChange,
  profile,
  defaultAgentId = null,
  onSaved,
}: TestProfileFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            <TestProfileDialogTitle profile={profile} />
          </DialogTitle>
        </DialogHeader>
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <TestProfileForm
            profile={profile}
            defaultAgentId={defaultAgentId}
            onSaved={(profileId) => {
              onOpenChange(false);
              onSaved?.(profileId);
            }}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
