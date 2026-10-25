'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { CreateViewForm } from './create-view-form';

type CreateViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateViewDialog({
  open,
  onOpenChange,
}: CreateViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-base font-semibold">
            Create New View
          </DialogTitle>
          <DialogDescription className="text-xs">
            Create a new view by selecting agents and, optionally, their
            versions. A view once applied stays across results and calls page.
          </DialogDescription>
        </DialogHeader>
        <CreateViewForm onCreated={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
