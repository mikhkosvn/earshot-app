'use client';

import { Controller } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { LabeledField } from '../../fields/labeled-field';

type RunLabelFieldProps = {
  control: RunSettingsForm['control'];
};

export function RunLabelField({ control }: RunLabelFieldProps) {
  return (
    <Controller
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-label"
          label="Label"
          description="Add helpful text for your reference later"
          error={fieldState.error}
        >
          <Input
            {...field}
            id="run-label"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
        </LabeledField>
      )}
    />
  );
}
