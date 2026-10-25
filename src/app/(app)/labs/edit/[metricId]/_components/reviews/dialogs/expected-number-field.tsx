'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { ExpectedValueFormInput } from '../../../_schemas/lab-review-form-schemas';
import {
  numberInputOf,
  numberValueOf,
} from '../../../_utils/expected-options';

export function ExpectedNumberField() {
  const { control } = useFormContext<ExpectedValueFormInput>();

  return (
    <Controller
      name="expectedValue"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <Input
            type="number"
            step="any"
            name={field.name}
            ref={field.ref}
            defaultValue={numberInputOf(field.value)}
            aria-label="Expected value"
            aria-invalid={fieldState.invalid}
            placeholder="N/A"
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(numberValueOf(event.target))}
          />
          <FieldDescription className="text-xs">
            Leave the field empty for N/A.
          </FieldDescription>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
