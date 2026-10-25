'use client';

import { Input } from '@/components/ui/input';

type NullableNumberInputProps = {
  id?: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  placeholder?: string;
  invalid?: boolean;
  min?: number;
  max?: number;
};

const displayValue = (value: number | null) => {
  if (value === null || Number.isNaN(value)) return '';
  return value;
};

const toNumber = (text: string) => {
  if (text.trim() === '') return null;
  return Number(text);
};

export function NullableNumberInput({
  id,
  value,
  onValueChange,
  placeholder,
  invalid,
  min,
  max,
}: NullableNumberInputProps) {
  return (
    <Input
      id={id}
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      value={displayValue(value)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className="bg-background"
      onChange={(event) => onValueChange(toNumber(event.target.value))}
    />
  );
}
