'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';
import { Field, FieldError } from '@/components/ui/field';
import type { RubricMetricOption } from '@/server/rubric/types';

import { useRubricMetrics } from '../../_hooks/use-rubric-metrics';
import { useRuleMetric } from '../../_hooks/use-rule-metric';
import type { RubricFormValues } from '../../_schemas/rubric-form-schema';
import { changeRuleMetric } from '../../_utils/rule-transitions';
import { RubricFieldLabel } from './rubric-field-label';

interface RubricMetricFieldProps {
  index: number;
}

export function RubricMetricField({ index }: RubricMetricFieldProps) {
  const form = useFormContext<RubricFormValues>();
  const metrics = useRubricMetrics();
  const metric = useRuleMetric(index);
  const id = `rubric-rule-${index}-metric`;

  return (
    <Controller
      name={`rules.${index}.metricId`}
      control={form.control}
      render={({ fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <RubricFieldLabel htmlFor={id}>Metric</RubricFieldLabel>
          <Combobox<RubricMetricOption>
            items={metrics}
            value={metric}
            itemToStringLabel={(option) => option.name}
            isItemEqualToValue={(option, value) => option.id === value.id}
            onValueChange={(option) => {
              if (!option) return;
              changeRuleMetric(form, index, option);
            }}
          >
            <ComboboxTrigger
              id={id}
              aria-invalid={fieldState.invalid}
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between bg-background font-normal"
                />
              }
            >
              <span className="truncate">
                <ComboboxValue placeholder="Select a metric" />
              </span>
            </ComboboxTrigger>
            <ComboboxContent className="min-w-72">
              <ComboboxInput
                placeholder="Search metrics..."
                showTrigger={false}
              />
              <ComboboxEmpty>No metric found.</ComboboxEmpty>
              <ComboboxList aria-label="Suggestions">
                {(option: RubricMetricOption) => (
                  <ComboboxItem key={option.id} value={option}>
                    {option.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
