'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { CorrectMetricFormInput } from '../../_schemas/correct-metric-form-schema';
import {
  type CorrectionOption,
  optionKeyOf,
} from '../../_utils/correction-options';

interface CorrectMetricOptionFieldProps {
  options: readonly CorrectionOption[];
}

export function CorrectMetricOptionField({
  options,
}: CorrectMetricOptionFieldProps) {
  const { control } = useFormContext<CorrectMetricFormInput>();

  return (
    <Controller
      name="expectedValue"
      control={control}
      render={({ field }) => (
        <RadioGroup
          aria-label="Correct value"
          value={optionKeyOf(options, field.value)}
          className="flex flex-wrap gap-4"
          onValueChange={(key) => {
            const match = options.find((option) => option.key === key);
            if (match) field.onChange(match.value);
          }}
        >
          {options.map((option) => {
            const id = `correct-metric-${option.key}`;
            return (
              <div
                key={option.key}
                className="flex flex-col items-center gap-1.5"
              >
                <Label
                  htmlFor={id}
                  className="font-normal text-muted-foreground"
                >
                  {option.label}
                </Label>
                <RadioGroupItem id={id} value={option.key} />
              </div>
            );
          })}
        </RadioGroup>
      )}
    />
  );
}
