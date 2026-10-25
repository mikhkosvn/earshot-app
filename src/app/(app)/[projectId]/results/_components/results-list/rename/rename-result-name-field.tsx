'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { RenameResultInput } from '@/server/results/types';

const FIELD_ID = 'rename-result-name';

export function RenameResultNameField() {
  const { control } = useFormContext<RenameResultInput>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID}>Label</FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            placeholder="Enter a label"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
