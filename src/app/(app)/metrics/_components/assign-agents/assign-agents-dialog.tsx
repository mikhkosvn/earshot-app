'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AssignAgentsForm } from './assign-agents-form';

interface AssignAgentsDialogProps {
  metricIds: number[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssignAgentsDialog({
  metricIds,
  open,
  onOpenChange,
}: AssignAgentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="text-base font-semibold">
            Assign Agents
          </DialogTitle>
          <DialogDescription className="text-xs">
            Select the agents for the {metricIds.length} selected metrics. The
            selected agents replace the current agents of each metric.
          </DialogDescription>
        </DialogHeader>
        <AssignAgentsForm
          metricIds={metricIds}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
