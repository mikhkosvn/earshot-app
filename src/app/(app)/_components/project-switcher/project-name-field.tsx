'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface ProjectNameFieldProps {
  id: string;
}

export function ProjectNameField({ id }: ProjectNameFieldProps) {
  const { control } = useFormContext<{ name: string }>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id} className="text-xs">
            Project name
          </FieldLabel>
          <Input
            {...field}
            id={id}
            autoFocus
            placeholder="Enter project name"
            aria-invalid={fieldState.invalid}
            className="text-xs md:text-xs"
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
