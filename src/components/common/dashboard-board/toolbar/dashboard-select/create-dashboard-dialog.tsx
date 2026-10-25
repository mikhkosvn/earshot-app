'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { DashboardSource } from '@/generated/prisma/enums';

import { CreateDashboardForm } from './name-form/create-dashboard-form';

type CreateDashboardDialogProps = {
  open: boolean;
  source: DashboardSource;
  onClose: () => void;
};

export function CreateDashboardDialog({
  open,
  source,
  onClose,
}: CreateDashboardDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Dashboard</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a name for your new dashboard
          </AlertDialogDescription>
        </AlertDialogHeader>
        <CreateDashboardForm source={source} onDone={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
