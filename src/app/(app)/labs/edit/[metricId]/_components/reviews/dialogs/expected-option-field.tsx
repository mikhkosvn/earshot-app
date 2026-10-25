'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { ExpectedValueFormInput } from '../../../_schemas/lab-review-form-schemas';
import {
  type ExpectedOption,
  expectedKeyOf,
} from '../../../_utils/expected-options';

type ExpectedOptionFieldProps = {
  options: ExpectedOption[];
};

export function ExpectedOptionField({ options }: ExpectedOptionFieldProps) {
  const { control } = useFormContext<ExpectedValueFormInput>();

  return (
    <Controller
      name="expectedValue"
      control={control}
      render={({ field }) => (
        <RadioGroup
          aria-label="Expected value"
          value={expectedKeyOf(options, field.value)}
          className="flex flex-wrap gap-4"
          onValueChange={(key) => {
            const match = options.find((option) => option.key === key);
            if (match) field.onChange(match.value);
          }}
        >
          {options.map((option) => {
            const id = `lab-expected-${option.key}`;
            return (
              <div key={option.key} className="flex items-center gap-2">
                <RadioGroupItem id={id} value={option.key} />
                <Label htmlFor={id} className="font-normal">
                  {option.label}
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      )}
    />
  );
}
