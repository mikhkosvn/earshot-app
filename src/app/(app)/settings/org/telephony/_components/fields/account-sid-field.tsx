'use client';

import { useWatch } from 'react-hook-form';

import { PhoneNumberAccountLabel } from '@/server/telephony-phone-numbers/constants/phone-number-credential-labels';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

import { PhoneNumberTextField } from './phone-number-text-field';

interface AccountSidFieldProps {
  idPrefix: string;
}

export function AccountSidField({ idPrefix }: AccountSidFieldProps) {
  const provider = useWatch<ImportPhoneNumberFormValues, 'provider'>({
    name: 'provider',
  });
  const label = PhoneNumberAccountLabel[provider];
  if (!label) return null;

  return (
    <PhoneNumberTextField
      id={`${idPrefix}-account-sid`}
      name="accountSid"
      label={label}
      placeholder={`Enter your ${label}`}
    />
  );
}
