'use client';

import { type ReactNode, useId } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { toNumberInputValue } from '@/app/(app)/settings/_utils/number-input-value';

import { SettingFieldDescription } from './setting-field-description';

type SettingNumberFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: string;
  description?: ReactNode;
  scale?: number;
  step?: number | 'any';
};

export function SettingNumberField<Values extends FieldValues>({
  name,
  label,
  description,
  scale = 1,
  step = 1,
}: SettingNumberFieldProps<Values>) {
  const { control } = useFormContext<Values>();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            {label}
          </FieldLabel>
          <Input
            ref={field.ref}
            name={field.name}
            id={id}
            type="number"
            step={step}
            inputMode="decimal"
            value={toNumberInputValue(field.value, scale)}
            aria-invalid={fieldState.invalid}
            className="bg-background"
            onBlur={field.onBlur}
            onChange={(event) =>
              field.onChange(event.target.valueAsNumber / scale)
            }
          />
          <SettingFieldDescription description={description} />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
