'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LAST_QUICK_RANGES } from '@/lib/time-range/constants';

import type { SaveConfigurationFormValues } from '../../_schemas/save-configuration-form-schema';

const FIELD_ID = 'save-dashboard-range';

const ITEMS = LAST_QUICK_RANGES.map((range) => ({
  value: range.label,
  label: range.label,
}));

export function DateRangeField() {
  const { control } = useFormContext<SaveConfigurationFormValues>();

  return (
    <Controller
      name="range"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Date range
          </FieldLabel>
          <Select
            items={ITEMS}
            value={field.value}
            onValueChange={(next) => {
              if (next === null) return;
              field.onChange(next);
            }}
          >
            <SelectTrigger
              id={FIELD_ID}
              aria-label="Date range"
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
