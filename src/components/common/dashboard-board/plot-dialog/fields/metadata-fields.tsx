'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { z } from 'zod';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { WidgetField } from '@/generated/prisma/enums';
import { MetadataFieldTypeLabel } from '@/server/dashboards/constants/labels/plot-option-labels';
import { MetadataFieldType } from '@/server/dashboards/constants/plot/metadata-field-type';

import { usePlotMetricsQuery } from '../../_hooks/queries/use-plot-metrics-query';
import type { PlotFormValues } from '../../_schemas/plot-form-schema';
import { changeMetadataType } from '../../_utils/plot-form-transitions';
import { PlotSelect } from './plot-select';

const typeSchema = z.enum(MetadataFieldType);

const TYPE_ITEMS = Object.values(MetadataFieldType).map((type) => ({
  value: type,
  label: MetadataFieldTypeLabel[type],
}));

export function MetadataFields() {
  const form = useFormContext<PlotFormValues>();
  const field = useWatch<PlotFormValues, 'field'>({ name: 'field' });
  const { data: metrics } = usePlotMetricsQuery();

  if (field !== WidgetField.metadata) return null;

  return (
    <>
      <Controller
        name="metadataKey"
        control={form.control}
        render={({ field: keyField, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor="plot-metadata-key" className="text-xs">
              Metadata Key
            </FieldLabel>
            <Input
              id="plot-metadata-key"
              value={keyField.value ?? ''}
              placeholder="e.g., customer_id, region, plan_type"
              aria-invalid={fieldState.invalid}
              onChange={(event) => keyField.onChange(event.target.value)}
              onBlur={keyField.onBlur}
            />
            <FieldDescription className="text-xs">
              Enter the metadata field key (will be sent as metadata.key)
            </FieldDescription>
            <FieldError errors={[fieldState.error]} className="text-xs" />
          </Field>
        )}
      />
      <Controller
        name="metadataFieldType"
        control={form.control}
        render={({ field: typeField }) => (
          <div className="flex flex-col gap-1">
            <PlotSelect
              id="plot-metadata-type"
              label="Field Type"
              items={TYPE_ITEMS}
              value={typeField.value}
              onValueChange={(value) =>
                changeMetadataType(form, typeSchema.parse(value), metrics)
              }
            />
            <p className="text-xs text-muted-foreground">
              String/Boolean fields only support Pie and List charts
            </p>
          </div>
        )}
      />
    </>
  );
}
