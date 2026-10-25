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
import type { CreateAlertInput } from '@/server/alerts/types';

import { useAlertMetricOptionsQuery } from '../../_hooks/queries/use-alert-metric-options-query';
import { selectAlertMetric } from '../../_utils/alert-form-transitions';
import { MetricOptionLabel } from './metric-option-label';

const FIELD_ID = 'alert-metric';

const selectedValue = (metricId: number) => {
  if (metricId > 0) return metricId;
  return null;
};

export function AlertMetricField() {
  const form = useFormContext<CreateAlertInput>();
  const { data: metrics } = useAlertMetricOptionsQuery();
  const items = metrics.map((metric) => ({
    value: metric.id,
    label: metric.name,
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
              selectAlertMetric(form, metric);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full text-xs">
              <SelectValue placeholder="Select a metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem
                  key={metric.id}
                  value={metric.id}
                  className="text-xs"
                >
                  <MetricOptionLabel
                    name={metric.name}
                    evalType={metric.evalType}
                  />
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
