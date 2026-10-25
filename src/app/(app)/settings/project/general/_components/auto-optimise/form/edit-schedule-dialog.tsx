'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';

import { EditScheduleForm } from './edit-schedule-form';

type EditScheduleDialogProps = {
  schedule: OptimizerScheduleView;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditScheduleDialog({
  schedule,
  open,
  onOpenChange,
}: EditScheduleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-md">
        <DialogHeader className="border-b p-4">
          <DialogTitle>Edit schedule</DialogTitle>
        </DialogHeader>
        <EditScheduleForm
          schedule={schedule}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
