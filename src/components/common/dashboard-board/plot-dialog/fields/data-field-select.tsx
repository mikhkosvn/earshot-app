'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { type DashboardSource, WidgetField } from '@/generated/prisma/enums';
import { WidgetFieldLabel } from '@/server/dashboards/constants/labels/widget-field-labels';
import { SOURCE_FIELDS } from '@/server/dashboards/constants/plot/field-value-kind';

import { usePlotMetricsQuery } from '../../_hooks/queries/use-plot-metrics-query';
import type { PlotFormValues } from '../../_schemas/plot-form-schema';
import { changePlotField } from '../../_utils/plot-form-transitions';
import { PlotSelect } from './plot-select';

interface DataFieldSelectProps {
  source: DashboardSource;
}

const fieldSchema = z.enum(WidgetField);

export function DataFieldSelect({ source }: DataFieldSelectProps) {
  const form = useFormContext<PlotFormValues>();
  const { data: metrics } = usePlotMetricsQuery();
  const items = SOURCE_FIELDS[source].map((field) => ({
    value: field,
    label: WidgetFieldLabel[field],
  }));

  return (
    <Controller
      name="field"
      control={form.control}
      render={({ field, fieldState }) => (
        <PlotSelect
          id="plot-data-field"
          label="Data Field"
          items={items}
          value={field.value}
          placeholder="Select a field to visualize"
          error={fieldState.error}
          onValueChange={(value) =>
            changePlotField(form, fieldSchema.parse(value), metrics)
          }
        />
      )}
    />
  );
}
