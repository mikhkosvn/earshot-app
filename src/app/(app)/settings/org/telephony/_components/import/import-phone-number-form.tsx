'use client';

import { FormProvider } from 'react-hook-form';

import { useImportPhoneNumberForm } from '../../_hooks/use-import-phone-number-form';
import { PhoneNumberFields } from '../fields/phone-number-fields';
import { ImportNumberButton } from './import-number-button';

export function ImportPhoneNumberForm() {
  const { form, onSubmit } = useImportPhoneNumberForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <div className="rounded-lg border p-4">
          <PhoneNumberFields idPrefix="import-number" />
        </div>
        <div className="flex justify-end">
          <ImportNumberButton />
        </div>
      </form>
    </FormProvider>
  );
}
