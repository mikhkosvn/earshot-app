'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateScheduleForm } from './create-schedule-form';

type CreateScheduleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateScheduleDialog({
  open,
  onOpenChange,
}: CreateScheduleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="gap-1 border-b p-4">
          <DialogTitle>Add schedule</DialogTitle>
          <DialogDescription>
            The optimiser improves each metric whose Lab got new rows since its
            last optimisation.
          </DialogDescription>
        </DialogHeader>
        <CreateScheduleForm onSaved={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
