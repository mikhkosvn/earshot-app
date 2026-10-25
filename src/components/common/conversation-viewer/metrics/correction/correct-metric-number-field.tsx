'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { CorrectMetricFormInput } from '../../_schemas/correct-metric-form-schema';

const inputValue = (value: CorrectMetricFormInput['expectedValue']) => {
  if (typeof value === 'number') return value;
  return '';
};

const parsedValue = (input: HTMLInputElement) => {
  if (input.value === '') return null;
  return input.valueAsNumber;
};

export function CorrectMetricNumberField() {
  const { control } = useFormContext<CorrectMetricFormInput>();

  return (
    <Controller
      name="expectedValue"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-32">
          <Input
            type="number"
            step="any"
            name={field.name}
            ref={field.ref}
            value={inputValue(field.value)}
            aria-label="Correct value"
            aria-invalid={fieldState.invalid}
            placeholder="N/A"
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(parsedValue(event.target))}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
