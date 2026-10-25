'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { AddConnectorForm } from './add-connector-form';

type AddConnectorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddConnectorDialog({
  open,
  onOpenChange,
}: AddConnectorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Connector</DialogTitle>
          <DialogDescription>
            Configure a new knowledge base connector to sync data from external
            sources.
          </DialogDescription>
        </DialogHeader>
        <AddConnectorForm
          key={String(open)}
          onCreated={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
