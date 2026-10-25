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

import { FLAG_CHANGE_ITEMS } from '../../_constants/flag-change';
import { type MetricFlag, MetricFlagLabel } from '../../_constants/metric-flag';
import type { ToggleSettingsValues } from '../../_hooks/forms/use-toggle-settings-form';

interface FlagChangeFieldProps {
  flag: MetricFlag;
}

export function FlagChangeField({ flag }: FlagChangeFieldProps) {
  const { control } = useFormContext<ToggleSettingsValues>();
  const id = `toggle-settings-${flag}`;

  return (
    <Controller
      name={flag}
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            {MetricFlagLabel[flag]}
          </FieldLabel>
          <Select
            items={FLAG_CHANGE_ITEMS}
            value={field.value}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={id} className="w-full text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FLAG_CHANGE_ITEMS.map((item) => (
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
        </Field>
      )}
    />
  );
}
