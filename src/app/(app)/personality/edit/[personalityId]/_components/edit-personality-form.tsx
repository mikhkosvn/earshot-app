'use client';

import { FormProvider } from 'react-hook-form';

import { PERSONALITY_INTRO_EDIT } from '../../../_constants/personality-form-defaults';
import { useEditPersonalityForm } from '../../../_hooks/form/use-edit-personality-form';
import { usePersonalityDetail } from '../../../_hooks/form/use-personality-detail';
import { EditFormStatus } from '../../../_components/form/edit-form-status';
import { PersonalityFormBody } from '../../../_components/form/personality-form-body';
import { PersonalityFormFooter } from '../../../_components/form/personality-form-footer';
import { PersonalityHeaderCard } from '../../../_components/form/personality-header-card';
import { DeletePersonalityButton } from './delete-personality-button';

export function EditPersonalityForm() {
  const personality = usePersonalityDetail();
  const { form, onSubmit } = useEditPersonalityForm();

  return (
    <FormProvider {...form}>
      <form noValidate className="flex flex-col gap-3" onSubmit={onSubmit}>
        <PersonalityHeaderCard
          title={personality.name}
          description={PERSONALITY_INTRO_EDIT}
        >
          <DeletePersonalityButton />
        </PersonalityHeaderCard>
        <PersonalityFormBody advancedOpen />
        <PersonalityFormFooter
          status={<EditFormStatus />}
          submitLabel="Save changes"
        />
      </form>
    </FormProvider>
  );
}
