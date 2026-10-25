'use client';

import { FormProvider, type UseFormReturn } from 'react-hook-form';

import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import type { DashboardNameFormValues } from '../../../_schemas/dashboard-name-form-schema';
import { DashboardNameField } from './dashboard-name-field';
import { DashboardNameSubmit } from './dashboard-name-submit';

type DashboardNameFormProps = {
  form: UseFormReturn<DashboardNameFormValues>;
  onSubmit: () => void;
  submitLabel: string;
  isPending: boolean;
};

export function DashboardNameForm({
  form,
  onSubmit,
  submitLabel,
  isPending,
}: DashboardNameFormProps) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <DashboardNameField />
        <div className="flex justify-end gap-2">
          <AlertDialogCancel
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </AlertDialogCancel>
          <DashboardNameSubmit label={submitLabel} isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}
