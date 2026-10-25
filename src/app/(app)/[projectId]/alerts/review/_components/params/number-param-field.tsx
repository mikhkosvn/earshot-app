'use client';

import { Controller, type FieldPath, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';

const inputValueOf = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
};

type NumberParamFieldProps = {
  name: FieldPath<EditAlertFormValues>;
  label: string;
  step?: number;
};

export function NumberParamField({
  name,
  label,
  step = 1,
}: NumberParamFieldProps) {
  const { control } = useFormContext<EditAlertFormValues>();
  const id = `alert-${name.replaceAll('.', '-')}`;

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
            id={id}
            type="number"
            step={step}
            name={field.name}
            ref={field.ref}
            onBlur={field.onBlur}
            value={inputValueOf(field.value)}
            onChange={(event) => field.onChange(event.target.valueAsNumber)}
            className="h-8 text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-[11px]" />
        </Field>
      )}
    />
  );
}
