'use client';

import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

import { COUNTRY_ITEMS } from '../../_constants/country-dial-codes';
import {
  findCountryByIso,
  findCountryForPhoneNumber,
  joinPhoneNumber,
  nationalPart,
} from '../../_utils/phone-number-parts';

type PhoneNumberFieldProps = {
  idPrefix: string;
};

export function PhoneNumberField({ idPrefix }: PhoneNumberFieldProps) {
  const { control, getValues } = useFormContext<ImportPhoneNumberFormValues>();
  const [countryIso, setCountryIso] = useState(
    () => findCountryForPhoneNumber(getValues('phoneNumber')).iso,
  );
  const country = findCountryByIso(countryIso);
  const id = `${idPrefix}-phone-number`;

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            Phone Number
          </FieldLabel>
          <div className="flex gap-2">
            <Select
              items={COUNTRY_ITEMS}
              value={countryIso}
              onValueChange={(value) => {
                if (value === null) return;
                const nextCountry = findCountryByIso(value);
                setCountryIso(value);
                field.onChange(
                  joinPhoneNumber(
                    nextCountry,
                    nationalPart(field.value, country),
                  ),
                );
              }}
            >
              <SelectTrigger
                aria-label="Country code"
                className="w-28 shrink-0 bg-background"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_ITEMS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              ref={field.ref}
              id={id}
              name={field.name}
              type="tel"
              inputMode="tel"
              placeholder="12345678"
              autoComplete="off"
              value={nationalPart(field.value, country)}
              aria-invalid={fieldState.invalid}
              className="bg-background"
              onBlur={field.onBlur}
              onChange={(event) =>
                field.onChange(joinPhoneNumber(country, event.target.value))
              }
            />
          </div>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
