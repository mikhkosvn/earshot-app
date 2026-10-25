'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { PersonalityFormValues } from '@/server/personalities/types';

import { FormSectionHeader } from '../form-section-header';

export function IdentitySection() {
  const { control } = useFormContext<PersonalityFormValues>();

  return (
    <section>
      <FormSectionHeader
        title="Identity"
        description="What this personality is called and how it should behave."
      />
      <div className="flex flex-col gap-4 p-3">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="personality-name" className="gap-0">
                Personality Name<span className="text-destructive">*</span>
              </FieldLabel>
              <Input {...field} id="personality-name" aria-invalid={fieldState.invalid} />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <Controller
          name="prompt"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <div className="flex flex-col gap-0.5">
                <FieldLabel htmlFor="personality-prompt" className="gap-0">
                  Personality Prompt<span className="text-destructive">*</span>
                </FieldLabel>
                <FieldDescription className="text-xs">
                  Detailed instructions defining how the AI agent should behave,
                  respond, and handle conversations
                </FieldDescription>
              </div>
              <Textarea
                {...field}
                id="personality-prompt"
                aria-invalid={fieldState.invalid}
                className="field-sizing-fixed h-36"
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>
    </section>
  );
}
