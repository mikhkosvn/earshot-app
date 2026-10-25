'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { CreateSavedViewInput } from '@/server/saved-views/types';

const FIELD_ID = 'create-view-name';

export function ViewNameField() {
  const { control } = useFormContext<CreateSavedViewInput>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            View Name
            <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            placeholder="Enter view name"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
