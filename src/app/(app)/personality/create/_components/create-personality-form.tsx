'use client';

import { FormProvider } from 'react-hook-form';

import { PERSONALITY_INTRO_CREATE } from '../../_constants/personality-form-defaults';
import { useCreatePersonalityForm } from '../../_hooks/form/use-create-personality-form';
import { PersonalityFormBody } from '../../_components/form/personality-form-body';
import { PersonalityFormFooter } from '../../_components/form/personality-form-footer';
import { PersonalityHeaderCard } from '../../_components/form/personality-header-card';

export function CreatePersonalityForm() {
  const { form, onSubmit } = useCreatePersonalityForm();

  return (
    <FormProvider {...form}>
      <form noValidate className="flex flex-col gap-3" onSubmit={onSubmit}>
        <PersonalityHeaderCard
          title="Create personality"
          description={PERSONALITY_INTRO_CREATE}
        />
        <PersonalityFormBody advancedOpen={false} />
        <PersonalityFormFooter
          status="Fill in the required fields to continue."
          submitLabel="Create personality"
        />
      </form>
    </FormProvider>
  );
}
