'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AddVariablesForm } from './add-variables-form';

type AddVariablesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddVariablesDialog({
  open,
  onOpenChange,
}: AddVariablesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Dynamic Variables</DialogTitle>
          <DialogDescription>
            Define one or more dynamic variables. Each variable needs a name and
            a description.
          </DialogDescription>
        </DialogHeader>
        <AddVariablesForm
          key={String(open)}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
