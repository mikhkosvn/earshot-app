'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { FolderNameFormValues } from '@/server/folders/types';

interface FolderNameFieldProps {
  id: string;
}

export function FolderNameField({ id }: FolderNameFieldProps) {
  const { control } = useFormContext<FolderNameFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={id}>Folder Name</FieldLabel>
          <Input
            {...field}
            id={id}
            autoFocus
            placeholder="Folder name"
            aria-invalid={fieldState.invalid}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
