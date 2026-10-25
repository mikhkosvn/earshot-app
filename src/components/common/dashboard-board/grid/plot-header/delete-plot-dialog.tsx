'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeletePlotDialogProps {
  open: boolean;
  name: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeletePlotDialog({
  open,
  name,
  onOpenChange,
  onConfirm,
}: DeletePlotDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Plot</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{name}&quot;? This change will
            be applied when you save.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            Mark for Deletion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
