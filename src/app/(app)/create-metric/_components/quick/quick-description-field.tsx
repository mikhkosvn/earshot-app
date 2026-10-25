'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { QUICK_DESCRIPTION_PLACEHOLDER } from '../../_constants/quick-mode-text';
import type { QuickMetricFormInput } from '../../_schemas/quick-metric-form-schema';

export function QuickDescriptionField() {
  const { control } = useFormContext<QuickMetricFormInput>();

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <Textarea
            {...field}
            aria-label="Describe the metric"
            aria-invalid={fieldState.invalid}
            placeholder={QUICK_DESCRIPTION_PLACEHOLDER}
            className="min-h-48"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
