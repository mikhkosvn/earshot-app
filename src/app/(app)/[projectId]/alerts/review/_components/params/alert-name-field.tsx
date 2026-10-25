'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import type { EditAlertFormValues } from '../../_schemas/edit-alert-form-schema';

const FIELD_ID = 'alert-name';

interface AlertNameFieldProps {
  placeholder: string;
}

export function AlertNameField({ placeholder }: AlertNameFieldProps) {
  const { control } = useFormContext<EditAlertFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Name
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            placeholder={placeholder}
            className="text-xs md:text-xs"
          />
          <FieldDescription className="text-[11px]">
            Used as the alert title in notifications and the alerts table.
          </FieldDescription>
          <FieldError errors={[fieldState.error]} className="text-[11px]" />
        </Field>
      )}
    />
  );
}
