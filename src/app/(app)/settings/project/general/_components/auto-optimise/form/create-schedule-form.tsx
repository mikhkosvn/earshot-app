'use client';

import { FormProvider } from 'react-hook-form';

import { useCreateScheduleForm } from '../../../_hooks/auto-optimise/use-create-schedule-form';
import { ScheduleFormFields } from './schedule-form-fields';
import { ScheduleFormFooter } from './schedule-form-footer';

type CreateScheduleFormProps = {
  onSaved: () => void;
};

export function CreateScheduleForm({ onSaved }: CreateScheduleFormProps) {
  const { form, onSubmit, isSaving } = useCreateScheduleForm(onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <ScheduleFormFields />
        <ScheduleFormFooter isSaving={isSaving} submitLabel="Add schedule" />
      </form>
    </FormProvider>
  );
}
