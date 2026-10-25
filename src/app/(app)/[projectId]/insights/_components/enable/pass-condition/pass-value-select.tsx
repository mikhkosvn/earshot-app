'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SaveInsightConfigInput } from '@/server/insights/types';

interface PassValueSelectProps {
  values: readonly string[];
}

export function PassValueSelect({ values }: PassValueSelectProps) {
  const { control } = useFormContext<SaveInsightConfigInput>();
  const items = values.map((value) => ({ value, label: value }));

  return (
    <Controller
      name="passValue"
      control={control}
      render={({ field }) => (
        <Select
          items={items}
          value={field.value}
          onValueChange={(value) => {
            if (value === null) return;
            field.onChange(value);
          }}
        >
          <SelectTrigger
            aria-label="Passing threshold value"
            className="w-full text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-xs"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
