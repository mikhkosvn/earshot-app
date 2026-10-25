'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { WidgetField } from '@/generated/prisma/enums';

import { usePlotMetricsQuery } from '../../_hooks/queries/use-plot-metrics-query';
import type { PlotFormValues } from '../../_schemas/plot-form-schema';
import { changePlotMetric } from '../../_utils/plot-form-transitions';
import { PlotSelect } from './plot-select';

const valueOf = (metricId: number | null) => {
  if (metricId === null) return null;
  return String(metricId);
};

export function MetricSelect() {
  const form = useFormContext<PlotFormValues>();
  const field = useWatch<PlotFormValues, 'field'>({ name: 'field' });
  const { data: metrics } = usePlotMetricsQuery();

  if (field !== WidgetField.metric_value) return null;

  const items = metrics.map((metric) => ({
    value: String(metric.id),
    label: `${metric.id} ${metric.name}`,
  }));

  return (
    <Controller
      name="metricId"
      control={form.control}
      render={({ field: metricField, fieldState }) => (
        <PlotSelect
          id="plot-metric"
          label="Select Metric"
          items={items}
          value={valueOf(metricField.value)}
          placeholder="Select a metric"
          error={fieldState.error}
          onValueChange={(value) =>
            changePlotMetric(form, Number(value), metrics)
          }
        />
      )}
    />
  );
}
