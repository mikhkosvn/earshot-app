'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AgentConfigValues } from '@/server/agents/types';

const FIELD_ID = 'agent-phone-number';

export function PhoneNumberField() {
  const { control } = useFormContext<AgentConfigValues>();

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Phone Number
          </FieldLabel>
          <FieldDescription className="text-xs">
            Phone number your AI Agent receives calls on or makes calls from
          </FieldDescription>
          <Input
            {...field}
            id={FIELD_ID}
            type="tel"
            placeholder="+1"
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className="bg-background text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
