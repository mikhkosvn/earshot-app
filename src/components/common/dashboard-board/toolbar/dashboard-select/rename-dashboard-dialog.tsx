'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { DashboardItem } from '@/server/dashboards/types';

import { RenameDashboardForm } from './name-form/rename-dashboard-form';

interface RenameDashboardDialogProps {
  dashboard: DashboardItem | null;
  onClose: () => void;
}

export function RenameDashboardDialog({
  dashboard,
  onClose,
}: RenameDashboardDialogProps) {
  return (
    <AlertDialog
      open={dashboard !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Dashboard</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new name for this dashboard
          </AlertDialogDescription>
        </AlertDialogHeader>
        <RenameDashboardForm dashboard={dashboard} onDone={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
