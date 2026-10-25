'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';

import { useEditPhoneNumberForm } from '../../_hooks/use-edit-phone-number-form';
import { useIsUpdatingPhoneNumber } from '../../_hooks/use-is-updating-phone-number';
import { PhoneNumberFields } from '../fields/phone-number-fields';
import { SavePhoneNumberLabel } from './save-phone-number-label';

interface EditPhoneNumberFormProps {
  phoneNumber: PhoneNumberRow;
  onSaved: () => void;
}

const SAVED_SECRET_PLACEHOLDER = 'Saved. Type a new value to replace it.';

export function EditPhoneNumberForm({
  phoneNumber,
  onSaved,
}: EditPhoneNumberFormProps) {
  const { form, onSubmit } = useEditPhoneNumberForm(phoneNumber, onSaved);
  const isSaving = useIsUpdatingPhoneNumber();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <PhoneNumberFields
          idPrefix={`edit-number-${phoneNumber.id}`}
          authTokenPlaceholder={SAVED_SECRET_PLACEHOLDER}
        />
        <DialogFooter>
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <Button type="submit" size="sm" disabled={isSaving}>
            <SavePhoneNumberLabel />
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
