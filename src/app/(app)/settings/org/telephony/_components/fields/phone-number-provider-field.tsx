'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { PhoneNumberProvider } from '@/generated/prisma/enums';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PhoneNumberProviderLabel } from '@/server/telephony-phone-numbers/constants/phone-number-provider-labels';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

const PROVIDER_ITEMS = Object.values(PhoneNumberProvider).map((value) => ({
  value,
  label: PhoneNumberProviderLabel[value],
}));

interface PhoneNumberProviderFieldProps {
  idPrefix: string;
}

export function PhoneNumberProviderField({
  idPrefix,
}: PhoneNumberProviderFieldProps) {
  const { control } = useFormContext<ImportPhoneNumberFormValues>();
  const id = `${idPrefix}-provider`;

  return (
    <Controller
      name="provider"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            Provider
          </FieldLabel>
          <Select
            items={PROVIDER_ITEMS}
            value={field.value}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={id} className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROVIDER_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
