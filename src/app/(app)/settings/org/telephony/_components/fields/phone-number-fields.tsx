'use client';

import { SettingSwitchField } from '@/app/(app)/settings/_components/fields/setting-switch-field';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

import { AccountSidField } from './account-sid-field';
import { AuthTokenField } from './auth-token-field';
import { PhoneNumberField } from './phone-number-field';
import { PhoneNumberProviderField } from './phone-number-provider-field';
import { PhoneNumberTextField } from './phone-number-text-field';

type PhoneNumberFieldsProps = {
  idPrefix: string;
  authTokenPlaceholder?: string;
};

export function PhoneNumberFields({
  idPrefix,
  authTokenPlaceholder,
}: PhoneNumberFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <PhoneNumberProviderField idPrefix={idPrefix} />
        <PhoneNumberField idPrefix={idPrefix} />
        <AccountSidField idPrefix={idPrefix} />
        <AuthTokenField
          idPrefix={idPrefix}
          placeholder={authTokenPlaceholder}
        />
      </div>
      <PhoneNumberTextField
        id={`${idPrefix}-name`}
        name="name"
        label="Name"
        placeholder="Enter a name for this number"
      />
      <SettingSwitchField<ImportPhoneNumberFormValues>
        name="smsEnabled"
        label="Enable SMS Messaging"
        description="Enable SMS messaging for this phone number"
      />
    </div>
  );
}
