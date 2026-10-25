'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { SaveConfigurationFormValues } from '../../_schemas/save-configuration-form-schema';

const FIELD_ID = 'save-dashboard-name';

export function ConfigurationNameField() {
  const { control } = useFormContext<SaveConfigurationFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Dashboard name
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            placeholder="Weekly regression review"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
