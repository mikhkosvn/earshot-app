'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import { CreateApiKeyDialogBody } from './create-api-key-dialog-body';

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateApiKeyDialog({
  open,
  onOpenChange,
}: CreateApiKeyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <CreateApiKeyDialogBody onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
