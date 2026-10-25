'use client';

import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';

import { DeletePhoneNumberDialog } from './delete-phone-number-dialog';
import { EditPhoneNumberDialog } from './edit-phone-number-dialog';

type PhoneNumberRowActionsProps = {
  phoneNumber: PhoneNumberRow;
};

export function PhoneNumberRowActions({
  phoneNumber,
}: PhoneNumberRowActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="flex justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Edit ${phoneNumber.phoneNumber}`}
        onClick={() => setIsEditOpen(true)}
      >
        <PencilIcon />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`Delete ${phoneNumber.phoneNumber}`}
        className="text-destructive hover:text-destructive"
        onClick={() => setIsDeleteOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <EditPhoneNumberDialog
        phoneNumber={phoneNumber}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
      <DeletePhoneNumberDialog
        phoneNumberId={phoneNumber.id}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </div>
  );
}
