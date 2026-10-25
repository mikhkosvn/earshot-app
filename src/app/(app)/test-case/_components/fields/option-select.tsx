'use client';

import type { ReactNode } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectOption<TValue extends string | number> = {
  value: TValue | null;
  label: ReactNode;
};

type OptionSelectProps<TValue extends string | number> = {
  id?: string;
  items: SelectOption<TValue>[];
  value: TValue | null;
  onValueChange: (value: TValue | null) => void;
  placeholder: string;
  icon?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
};

export function OptionSelect<TValue extends string | number>({
  id,
  items,
  value,
  onValueChange,
  placeholder,
  icon,
  disabled,
  invalid,
  className,
}: OptionSelectProps<TValue>) {
  return (
    <Select<TValue | null>
      items={items}
      value={value}
      disabled={disabled}
      onValueChange={(next) => onValueChange(next)}
    >
      <SelectTrigger
        id={id}
        aria-invalid={invalid}
        className={cn('w-full bg-background', className)}
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
