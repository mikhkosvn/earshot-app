'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterItem<Value extends string> {
  value: Value;
  label: string;
}

interface FilterSelectProps<Value extends string> {
  label: string;
  items: readonly FilterItem<Value>[];
  value: Value;
  onChange: (value: Value) => void;
}

export function FilterSelect<Value extends string>({
  label,
  items,
  value,
  onChange,
}: FilterSelectProps<Value>) {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onChange(next);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={label}
        className="min-w-32 bg-background text-xs"
      >
        <SelectValue />
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
