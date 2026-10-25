'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { PlotFormValues } from '../../_schemas/plot-form-schema';

const FIELD_ID = 'plot-name';

export function PlotNameField() {
  const { control } = useFormContext<PlotFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Plot Name
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            placeholder="e.g., Call Duration Trends"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
