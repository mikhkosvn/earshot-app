'use client';

import type { HTMLInputTypeAttribute } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface AuthTextFieldProps<Values extends FieldValues> {
  name: Path<Values>;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  placeholder?: string;
}

export function AuthTextField<Values extends FieldValues>({
  name,
  label,
  type = 'text',
  autoComplete,
  placeholder,
}: AuthTextFieldProps<Values>) {
  const { control } = useFormContext<Values>();
  const id = `auth-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
