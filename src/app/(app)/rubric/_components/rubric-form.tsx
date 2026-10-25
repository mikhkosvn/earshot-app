'use client';

import { FormProvider } from 'react-hook-form';

import { useRubricForm } from '../_hooks/use-rubric-form';
import { RubricConditionsCard } from './conditions/rubric-conditions-card';
import { RubricHeaderCard } from './rubric-header-card';
import { RubricInfoBar } from './rubric-info-bar';

export function RubricForm() {
  const { form, onSubmit } = useRubricForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
        <RubricHeaderCard />
        <RubricInfoBar />
        <RubricConditionsCard />
      </form>
    </FormProvider>
  );
}
