'use client';

import type { ReactNode } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

import { SettingFieldDescription } from './setting-field-description';

type SettingSwitchFieldProps<Values extends FieldValues> = {
  name: Path<Values>;
  label: string;
  description?: ReactNode;
};

export function SettingSwitchField<Values extends FieldValues>({
  name,
  label,
  description,
}: SettingSwitchFieldProps<Values>) {
  const { control } = useFormContext<Values>();
  const id = `setting-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="items-center gap-4">
          <FieldContent>
            <FieldLabel htmlFor={id} className="text-xs">
              {label}
            </FieldLabel>
            <SettingFieldDescription description={description} />
          </FieldContent>
          <Switch
            id={id}
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Field>
      )}
    />
  );
}
