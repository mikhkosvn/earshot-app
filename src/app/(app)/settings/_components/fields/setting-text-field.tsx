'use client';

import { type HTMLInputTypeAttribute, type ReactNode, useId } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { SettingFieldDescription } from './setting-field-description';

type SettingTextFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: string;
  description?: ReactNode;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
};

export function SettingTextField<Values extends FieldValues>({
  name,
  label,
  description,
  type = 'text',
  autoComplete,
}: SettingTextFieldProps<Values>) {
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
            {...field}
            id={id}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
          <SettingFieldDescription description={description} />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
