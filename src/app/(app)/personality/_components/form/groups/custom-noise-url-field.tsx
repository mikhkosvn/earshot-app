'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { BackgroundNoise } from '@/generated/prisma/enums';
import type { PersonalityFormValues } from '@/server/personalities/types';

export function CustomNoiseUrlField() {
  const { control } = useFormContext<PersonalityFormValues>();
  const noise = useWatch({ control, name: 'backgroundNoise' });
  if (noise !== BackgroundNoise.custom_url) return null;

  return (
    <Controller
      name="backgroundNoiseUrl"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor="personality-noise-url">Custom URL</FieldLabel>
          <Input
            {...field}
            id="personality-noise-url"
            type="url"
            placeholder="https://example.com/noise.mp3"
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
