'use client';

import { FormProvider } from 'react-hook-form';

import type { OptimizerScheduleView } from '@/server/metric-optimizer/types';

import { useEditScheduleForm } from '../../../_hooks/auto-optimise/use-edit-schedule-form';
import { ScheduleFormFields } from './schedule-form-fields';
import { ScheduleFormFooter } from './schedule-form-footer';

type EditScheduleFormProps = {
  schedule: OptimizerScheduleView;
  onSaved: () => void;
};

export function EditScheduleForm({ schedule, onSaved }: EditScheduleFormProps) {
  const { form, onSubmit, isSaving } = useEditScheduleForm(schedule, onSaved);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate>
        <ScheduleFormFields />
        <ScheduleFormFooter isSaving={isSaving} submitLabel="Save" />
      </form>
    </FormProvider>
  );
}
