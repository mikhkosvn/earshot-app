'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { MetricDefinitionValues } from '@/server/metrics/types';

const FIELD_ID = 'metric-slug';

interface MetricSlugFieldProps {
  onSlugEdit: () => void;
}

export function MetricSlugField({ onSlugEdit }: MetricSlugFieldProps) {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={FIELD_ID}>
            <span>
              Slug<span className="text-destructive">*</span>
            </span>
          </FieldLabel>
          <Input
            {...field}
            id={FIELD_ID}
            aria-invalid={fieldState.invalid}
            onChange={(event) => {
              field.onChange(event);
              onSlugEdit();
            }}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
