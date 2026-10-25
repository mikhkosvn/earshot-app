'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/field';
import { Switch } from '@/components/ui/switch';

import type { SaveConfigurationFormValues } from '../../_schemas/save-configuration-form-schema';

const FIELD_ID = 'save-dashboard-metric-visibility';

export function MetricVisibilityField() {
  const { control } = useFormContext<SaveConfigurationFormValues>();

  return (
    <Controller
      name="includeMetricVisibility"
      control={control}
      render={({ field }) => (
        <Field
          orientation="horizontal"
          className="items-start justify-between rounded-lg border p-3"
        >
          <FieldContent className="gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-sm">
              Include metric visibility
            </FieldLabel>
            <FieldDescription className="text-xs">
              Remembers which metrics are hidden on this dashboard.
            </FieldDescription>
          </FieldContent>
          <Switch
            id={FIELD_ID}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
        </Field>
      )}
    />
  );
}
