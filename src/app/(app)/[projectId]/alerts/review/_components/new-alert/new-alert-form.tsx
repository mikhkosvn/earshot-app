'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useNewAlertForm } from '../../_hooks/forms/use-new-alert-form';
import { AlertMetricField } from './alert-metric-field';
import { CreateAlertSubmitButton } from './create-alert-submit-button';
import { NewAlertDetails } from './new-alert-details';

interface NewAlertFormProps {
  onCreated: () => void;
}

export function NewAlertForm({ onCreated }: NewAlertFormProps) {
  const { form, onSubmit } = useNewAlertForm(onCreated);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
        <AlertMetricField />
        <NewAlertDetails />
        <div className="flex justify-end gap-2">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <CreateAlertSubmitButton />
        </div>
      </form>
    </FormProvider>
  );
}
