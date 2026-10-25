'use client';

import type { Ref } from 'react';

import { Input } from '@/components/ui/input';

import {
  numberInputValue,
  parseNumberInput,
} from '../_utils/form/number-input';

interface NullableNumberInputProps {
  id: string;
  ref?: Ref<HTMLInputElement>;
  value: number | null;
  onValueChange: (value: number | null) => void;
  onBlur?: () => void;
  placeholder?: string;
  invalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export function NullableNumberInput({
  id,
  ref,
  value,
  onValueChange,
  onBlur,
  placeholder,
  invalid,
  min,
  max,
  step,
}: NullableNumberInputProps) {
  return (
    <Input
      id={id}
      ref={ref}
      type="number"
      min={min}
      max={max}
      step={step}
      value={numberInputValue(value)}
      placeholder={placeholder}
      aria-label={placeholder}
      aria-invalid={invalid}
      onBlur={onBlur}
      className="bg-background"
      onChange={(event) => onValueChange(parseNumberInput(event.target.value))}
    />
  );
}
