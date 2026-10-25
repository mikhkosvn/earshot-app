'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { CodeEditor } from '@/components/common/metric-form/code-editor/code-editor';
import { Field, FieldError } from '@/components/ui/field';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';

export function LabCodeField() {
  const { control } = useFormContext<LabMetricFormInput>();

  return (
    <Controller
      name="customCode"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <CodeEditor
            label="Custom Code (Python Only)"
            name={field.name}
            value={field.value}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
