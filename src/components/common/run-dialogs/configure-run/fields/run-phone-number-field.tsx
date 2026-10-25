'use client';

import { Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { LabeledField } from '../../fields/labeled-field';

interface RunPhoneNumberFieldProps {
  control: RunSettingsForm['control'];
}

export function RunPhoneNumberField({ control }: RunPhoneNumberFieldProps) {
  return (
    <Controller
      control={control}
      name="agentNumber"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-phone-number"
          label="Phone Number"
          description="This is your phone number the Testing Agent will call on"
          error={fieldState.error}
        >
          <Input
            {...field}
            id="run-phone-number"
            type="tel"
            placeholder="+1 555 000 0000"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
        </LabeledField>
      )}
    />
  );
}
