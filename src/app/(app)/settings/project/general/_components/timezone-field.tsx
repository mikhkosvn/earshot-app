'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ProjectSettingsValues } from '@/server/projects/types';

import { TIMEZONE_ITEMS } from '../_constants/timezone-items';

const FIELD_ID = 'setting-timezone';

export function TimezoneField() {
  const { control } = useFormContext<ProjectSettingsValues>();

  return (
    <Controller
      name="timezone"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Timezone
          </FieldLabel>
          <Select
            items={TIMEZONE_ITEMS}
            value={field.value}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldDescription className="text-xs">
            Send reports in the selected timezone at 5:00 PM
          </FieldDescription>
        </Field>
      )}
    />
  );
}
