'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';

export function LabDescriptionField() {
  const { control } = useFormContext<LabMetricFormInput>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Textarea
            {...field}
            aria-label="LLM Judge description"
            aria-invalid={fieldState.invalid}
            placeholder="Enter LLM Judge description..."
            className="min-h-64"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
