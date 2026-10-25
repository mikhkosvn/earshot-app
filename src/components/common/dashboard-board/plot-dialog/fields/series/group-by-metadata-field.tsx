'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { WidgetGroupBy } from '@/server/dashboards/constants/plot/widget-group-by';

import type { PlotFormValues } from '../../../_schemas/plot-form-schema';

const FIELD_ID = 'plot-group-by-key';

export function GroupByMetadataField() {
  const { control } = useFormContext<PlotFormValues>();
  const groupBy = useWatch<PlotFormValues, 'groupBy'>({ name: 'groupBy' });

  if (groupBy !== WidgetGroupBy.metadata) return null;

  return (
    <Controller
      name="groupByMetadataKey"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Metadata Key
          </FieldLabel>
          <Input
            id={FIELD_ID}
            value={field.value ?? ''}
            placeholder="e.g., region"
            aria-invalid={fieldState.invalid}
            onChange={(event) => field.onChange(event.target.value)}
            onBlur={field.onBlur}
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
