'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

interface PhoneNumberTextFieldProps {
  id: string;
  name: 'name' | 'accountSid';
  label: string;
  placeholder: string;
}

export function PhoneNumberTextField({
  id,
  name,
  label,
  placeholder,
}: PhoneNumberTextFieldProps) {
  const { control } = useFormContext<ImportPhoneNumberFormValues>();

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
            placeholder={placeholder}
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
