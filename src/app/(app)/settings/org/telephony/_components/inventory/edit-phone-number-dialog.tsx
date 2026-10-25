'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';

import { EditPhoneNumberForm } from './edit-phone-number-form';

type EditPhoneNumberDialogProps = {
  phoneNumber: PhoneNumberRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditPhoneNumberDialog({
  phoneNumber,
  open,
  onOpenChange,
}: EditPhoneNumberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Phone Number</DialogTitle>
          <DialogDescription>
            Leave the secret empty to keep the saved value.
          </DialogDescription>
        </DialogHeader>
        <EditPhoneNumberForm
          phoneNumber={phoneNumber}
          onSaved={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
