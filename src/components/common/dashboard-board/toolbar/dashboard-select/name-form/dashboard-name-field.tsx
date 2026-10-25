'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { DashboardNameFormValues } from '../../../_schemas/dashboard-name-form-schema';

export function DashboardNameField() {
  const { control } = useFormContext<DashboardNameFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <Input
            {...field}
            aria-label="Dashboard name"
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            autoFocus
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
