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

import {
  TEAM_SIZE_ITEMS,
  TEAM_SIZE_OPTIONS,
} from '../_constants/team-size-items';
import type { OrganizationGeneralFormValues } from '../_hooks/use-organization-general-form';

const FIELD_ID = 'setting-team-size';

export function TeamSizeField() {
  const { control } = useFormContext<OrganizationGeneralFormValues>();

  return (
    <Controller
      name="teamSize"
      control={control}
      render={({ field }) => (
        <Field className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Team Size
          </FieldLabel>
          <Select
            items={TEAM_SIZE_ITEMS}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={FIELD_ID} className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEAM_SIZE_OPTIONS.map((item) => (
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
