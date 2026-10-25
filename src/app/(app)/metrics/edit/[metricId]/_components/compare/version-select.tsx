'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type VersionSelectProps = {
  label: string;
  placeholder: string;
  items: { value: number; label: string }[];
  value: number | null;
  onValueChange: (value: number) => void;
};

export function VersionSelect({
  label,
  placeholder,
  items,
  value,
  onValueChange,
}: VersionSelectProps) {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(next) => {
        if (next === null) return;
        onValueChange(next);
      }}
    >
      <SelectTrigger aria-label={label} className="min-w-0 flex-1">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
