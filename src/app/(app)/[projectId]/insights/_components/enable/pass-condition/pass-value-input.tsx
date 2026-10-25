'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { SaveInsightConfigInput } from '@/server/insights/types';

type PassValueInputProps = {
  disabled: boolean;
};

export function PassValueInput({ disabled }: PassValueInputProps) {
  const { control } = useFormContext<SaveInsightConfigInput>();

  return (
    <Controller
      name="passValue"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1">
          <Input
            {...field}
            inputMode="decimal"
            disabled={disabled}
            aria-label="Passing threshold value"
            className="text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-[11px]" />
        </Field>
      )}
    />
  );
}
