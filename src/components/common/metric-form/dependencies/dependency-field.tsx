'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { useDependencyItems } from '../_hooks/use-dependency-items';
import { MultiPick } from '../multi-pick/multi-pick';
import { DependencyHelp } from './dependency-help';

const FIELD_ID = 'metric-dependencies';

export function DependencyField() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const items = useDependencyItems();

  return (
    <Controller
      name="dependencyIds"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID}>Uses results from</FieldLabel>
            <FieldDescription className="text-xs">
              <DependencyHelp />
            </FieldDescription>
          </div>
          <MultiPick
            id={FIELD_ID}
            label="Uses results from"
            placeholder="Add a metric"
            items={items}
            value={field.value}
            invalid={fieldState.invalid}
            disabled={field.disabled}
            onValueChange={field.onChange}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
