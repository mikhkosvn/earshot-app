'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type PlotSelectItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

type PlotSelectProps = {
  id: string;
  label: string;
  items: PlotSelectItem[];
  value: string | null;
  placeholder?: string;
  error?: { message?: string };
  onValueChange: (value: string) => void;
};

export function PlotSelect({
  id,
  label,
  items,
  value,
  placeholder,
  error,
  onValueChange,
}: PlotSelectProps) {
  return (
    <Field data-invalid={Boolean(error)} className="gap-1.5">
      <FieldLabel htmlFor={id} className="text-xs">
        {label}
      </FieldLabel>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => {
          if (next === null) return;
          onValueChange(next);
        }}
      >
        <SelectTrigger id={id} aria-label={label} className="w-full text-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={[error]} className="text-xs" />
    </Field>
  );
}
