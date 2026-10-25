'use client';

import type { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SelectOption<TValue extends string | number> = {
  value: TValue;
  label: string;
};

type OptionSelectProps<TValue extends string | number> = {
  id?: string;
  ariaLabel?: string;
  items: SelectOption<TValue>[];
  value: TValue | null;
  onValueChange: (value: TValue) => void;
  placeholder: string;
  icon?: ReactNode;
  invalid?: boolean;
};

export function OptionSelect<TValue extends string | number>({
  id,
  ariaLabel,
  items,
  value,
  onValueChange,
  placeholder,
  icon,
  invalid,
}: OptionSelectProps<TValue>) {
  return (
    <Select<TValue | null>
      items={items}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        aria-invalid={invalid}
        className="w-full bg-background"
      >
        {icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={String(item.value)} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
