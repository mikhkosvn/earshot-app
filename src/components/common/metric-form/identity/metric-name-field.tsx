'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { MetricDefinitionValues } from '@/server/metrics/types';

const FIELD_ID = 'metric-name';

interface MetricNameFieldProps {
  onNameChange: (name: string) => void;
}

export function MetricNameField({ onNameChange }: MetricNameFieldProps) {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={FIELD_ID}>
            <span>
              Name<span className="text-destructive">*</span>
            </span>
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            aria-invalid={fieldState.invalid}
            onChange={(event) => {
              field.onChange(event);
              onNameChange(event.target.value);
            }}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
