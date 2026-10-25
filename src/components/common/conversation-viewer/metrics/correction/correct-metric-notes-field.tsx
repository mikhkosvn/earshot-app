'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import type { CorrectMetricFormInput } from '../../_schemas/correct-metric-form-schema';

export function CorrectMetricNotesField() {
  const { control } = useFormContext<CorrectMetricFormInput>();

  return (
    <Controller
      name="feedback"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Textarea
            {...field}
            value={field.value ?? ''}
            aria-label="Notes"
            aria-invalid={fieldState.invalid}
            placeholder="Enter your notes here..."
            className="min-h-24"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
