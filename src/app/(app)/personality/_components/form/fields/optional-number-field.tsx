'use client';

import { Controller, type Path, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { PersonalityFormValues } from '@/server/personalities/types';

import {
  numberInputValue,
  parseOptionalNumber,
} from '../../../_utils/number-input-value';

interface OptionalNumberFieldProps {
  name: Path<PersonalityFormValues>;
  label: string;
  placeholder: string;
  step: number;
}

export function OptionalNumberField({
  name,
  label,
  placeholder,
  step,
}: OptionalNumberFieldProps) {
  const { control } = useFormContext<PersonalityFormValues>();
  const id = `personality-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            id={id}
            type="number"
            min={0}
            step={step}
            placeholder={placeholder}
            value={numberInputValue(field.value)}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(parseOptionalNumber(event.target.value))
            }
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
