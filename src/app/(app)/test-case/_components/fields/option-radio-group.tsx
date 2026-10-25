'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioOption<TValue extends string> {
  value: TValue;
  label: string;
}

interface OptionRadioGroupProps<TValue extends string> {
  name: string;
  options: readonly RadioOption<TValue>[];
  value: TValue;
  onValueChange: (value: TValue) => void;
}

export function OptionRadioGroup<TValue extends string>({
  name,
  options,
  value,
  onValueChange,
}: OptionRadioGroupProps<TValue>) {
  return (
    <RadioGroup
      aria-label={name}
      value={value}
      className="flex flex-wrap gap-6"
      onValueChange={(next) => {
        const match = options.find((option) => option.value === next);
        if (match) onValueChange(match.value);
      }}
    >
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={id} value={option.value} />
            <Label htmlFor={id} className="font-normal">
              {option.label}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
