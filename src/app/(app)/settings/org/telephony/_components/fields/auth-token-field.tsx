'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { SecretInput } from '@/app/(app)/settings/_components/fields/secret-input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PhoneNumberTokenLabel } from '@/server/telephony-phone-numbers/constants/phone-number-credential-labels';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

type AuthTokenFieldProps = {
  idPrefix: string;
  placeholder?: string;
};

export function AuthTokenField({ idPrefix, placeholder }: AuthTokenFieldProps) {
  const { control } = useFormContext<ImportPhoneNumberFormValues>();
  const provider = useWatch<ImportPhoneNumberFormValues, 'provider'>({
    name: 'provider',
  });
  const label = PhoneNumberTokenLabel[provider];
  const id = `${idPrefix}-auth-token`;

  return (
    <Controller
      name="authToken"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            {label}
          </FieldLabel>
          <SecretInput
            {...field}
            id={id}
            placeholder={placeholder ?? `Enter your ${label}`}
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
