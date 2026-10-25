'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { CloneVoiceButton } from './clone-voice-button';
import { VoiceIdControl } from './voice-id-control';

const FIELD_ID = 'personality-voiceId';

export function VoiceIdField() {
  const { control } = useFormContext<PersonalityFormValues>();

  return (
    <Controller
      name="voiceId"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex h-5 items-center justify-between gap-2">
            <FieldLabel htmlFor={FIELD_ID} className="gap-0">
              Voice ID<span className="text-destructive">&nbsp;*</span>
            </FieldLabel>
            <CloneVoiceButton />
          </div>
          <VoiceIdControl
            id={FIELD_ID}
            value={field.value}
            invalid={fieldState.invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
