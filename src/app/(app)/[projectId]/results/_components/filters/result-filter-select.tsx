'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type ResultFilterSelectItem = {
  value: string;
  label: string;
};

type ResultFilterSelectProps = {
  items: ResultFilterSelectItem[];
  value: string;
  label: string;
  placeholder?: string;
  className?: string;
  onValueChange: (value: string) => void;
};

const selectedValue = (value: string) => {
  if (value) return value;
  return null;
};

export function ResultFilterSelect({
  items,
  value,
  label,
  placeholder,
  className,
  onValueChange,
}: ResultFilterSelectProps) {
  return (
    <Select
      items={items}
      value={selectedValue(value)}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={label}
        className={cn('w-full text-xs', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
