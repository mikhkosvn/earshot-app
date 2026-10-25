'use client';

import { Controller } from 'react-hook-form';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { LabeledField } from '../../fields/labeled-field';
import { NullableNumberInput } from '../../fields/nullable-number-input';

type RunNumberFieldName = 'frequency' | 'concurrencyLimit' | 'callsPerSecond';

type RunNumberFieldProps = {
  control: RunSettingsForm['control'];
  name: RunNumberFieldName;
  label: string;
  description: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
};

export function RunNumberField({
  control,
  name,
  label,
  description,
  placeholder,
  min,
  max,
  step,
}: RunNumberFieldProps) {
  const id = `run-${name}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <LabeledField
          id={id}
          label={label}
          description={description}
          error={fieldState.error}
        >
          <NullableNumberInput
            id={id}
            value={field.value ?? null}
            onValueChange={field.onChange}
            placeholder={placeholder}
            invalid={fieldState.invalid}
            min={min}
            max={max}
            step={step}
          />
        </LabeledField>
      )}
    />
  );
}
