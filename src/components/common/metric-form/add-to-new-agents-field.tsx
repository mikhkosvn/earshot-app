'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel } from '@/components/ui/field';
import type { MetricDefinitionValues } from '@/server/metrics/types';

const FIELD_ID = 'metric-add-to-new-agents';

export function AddToNewAgentsField() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="addToNewAgents"
      control={control}
      render={({ field }) => (
        <Field orientation="horizontal" className="gap-2">
          <Checkbox
            id={FIELD_ID}
            checked={field.value}
            disabled={field.disabled}
            onCheckedChange={field.onChange}
          />
          <FieldLabel htmlFor={FIELD_ID} className="font-normal">
            Automatically add to new agents
          </FieldLabel>
        </Field>
      )}
    />
  );
}
