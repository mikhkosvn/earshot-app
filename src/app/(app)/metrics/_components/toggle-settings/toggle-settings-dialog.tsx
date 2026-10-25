'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { ToggleSettingsForm } from './toggle-settings-form';

type ToggleSettingsDialogProps = {
  metricIds: number[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ToggleSettingsDialog({
  metricIds,
  open,
  onOpenChange,
}: ToggleSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-sm">
        <DialogHeader className="gap-1 border-b p-3">
          <DialogTitle className="text-base font-semibold">
            Toggle Settings
          </DialogTitle>
          <DialogDescription className="text-xs">
            Change the settings of the {metricIds.length} selected metrics.
          </DialogDescription>
        </DialogHeader>
        <ToggleSettingsForm
          metricIds={metricIds}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
