'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { DynamicVariableItem } from '@/server/agents/types';

import { EditVariableForm } from './edit-variable-form';

interface EditVariableDialogProps {
  variable: DynamicVariableItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditVariableDialog({
  variable,
  open,
  onOpenChange,
}: EditVariableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Dynamic Variable</DialogTitle>
        </DialogHeader>
        <EditVariableForm
          key={String(open)}
          variable={variable}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
