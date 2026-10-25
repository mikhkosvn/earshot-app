'use client';

import { FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';

import { useSaveConfigurationForm } from '../../_hooks/forms/use-save-configuration-form';
import { ConfigurationNameField } from './configuration-name-field';
import { DateRangeField } from './date-range-field';
import { FiltersIncluded } from './filters-included';
import { MetricVisibilityField } from './metric-visibility-field';
import { SaveDashboardSubmit } from './save-dashboard-submit';

type SaveDashboardFormProps = {
  onDone: () => void;
};

export function SaveDashboardForm({ onDone }: SaveDashboardFormProps) {
  const { form, onSubmit, isPending } = useSaveConfigurationForm(onDone);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col">
        <div className="flex flex-col gap-4 px-4 py-3">
          <ConfigurationNameField />
          <FiltersIncluded />
          <DateRangeField />
          <MetricVisibilityField />
        </div>
        <div className="flex justify-end gap-2 border-t px-4 py-3">
          <DialogClose
            render={<Button type="button" variant="outline" size="sm" />}
          >
            Cancel
          </DialogClose>
          <SaveDashboardSubmit isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}
