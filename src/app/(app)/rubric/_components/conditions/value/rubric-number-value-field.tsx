'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { RubricFormValues } from '../../../_schemas/rubric-form-schema';
import {
  numberInputValue,
  numberRuleValue,
} from '../../../_utils/number-rule-value';
import { RubricFieldLabel } from '../rubric-field-label';

interface RubricNumberValueFieldProps {
  index: number;
}

export function RubricNumberValueField({ index }: RubricNumberValueFieldProps) {
  const { control } = useFormContext<RubricFormValues>();
  const id = `rubric-rule-${index}-value`;

  return (
    <Controller
      name={`rules.${index}.value`}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <RubricFieldLabel htmlFor={id}>Value</RubricFieldLabel>
          <Input
            ref={field.ref}
            id={id}
            name={field.name}
            type="number"
            step="any"
            inputMode="decimal"
            placeholder="Enter value..."
            value={numberInputValue(field.value)}
            aria-invalid={fieldState.invalid}
            className="bg-background"
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(numberRuleValue(event.target.value))
            }
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
