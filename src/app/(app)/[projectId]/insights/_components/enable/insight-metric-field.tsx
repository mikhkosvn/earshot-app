'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SaveInsightConfigInput } from '@/server/insights/types';

import { useInsightMetricOptionsQuery } from '../../_hooks/queries/use-insight-metric-options-query';
import { selectInsightMetric } from '../../_utils/insight-form-values';
import { InsightMetricOptionLabel } from './insight-metric-option-label';

const FIELD_ID = 'insight-metric';

const selectedValue = (metricId: number) => {
  if (metricId > 0) return metricId;
  return null;
};

export function InsightMetricField() {
  const form = useFormContext<SaveInsightConfigInput>();
  const { data: metrics } = useInsightMetricOptionsQuery();
  const items = metrics.map((metric) => ({
    value: metric.id,
    label: `${metric.id} ${metric.name}`,
  }));

  return (
    <Controller
      name="metricId"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel htmlFor={FIELD_ID} className="text-xs">
            Metric
          </FieldLabel>
          <Select
            items={items}
            value={selectedValue(field.value)}
            onValueChange={(value) => {
              const metric = metrics.find((item) => item.id === value);
              if (!metric) return;
              selectInsightMetric(form, metric);
            }}
          >
            <SelectTrigger
              id={FIELD_ID}
              aria-label="Metric"
              className="w-full text-xs"
            >
              <SelectValue placeholder="Select a metric…" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem
                  key={metric.id}
                  value={metric.id}
                  className="text-xs"
                >
                  <InsightMetricOptionLabel id={metric.id} name={metric.name} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} className="text-[11px]" />
        </Field>
      )}
    />
  );
}
