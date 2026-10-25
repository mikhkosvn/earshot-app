'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { ModifyEvaluatorsFieldsValues } from '@/server/evaluators/types';

import { LabeledField } from '../../fields/labeled-field';
import { MetricsMultiSelect } from '../../fields/multi-select/metrics-multi-select';

export function ModifyMetricFields() {
  const { control } = useFormContext<ModifyEvaluatorsFieldsValues>();

  return (
    <>
      <Controller
        name="addMetricIds"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-add-metrics"
            label="Add Metrics"
            description="Select metrics to add to the scenarios"
          >
            <MetricsMultiSelect
              id="modify-add-metrics"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select Metrics to Add"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="removeMetricIds"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-remove-metrics"
            label="Remove Metrics"
            description="Select metrics to remove from the scenarios"
          >
            <MetricsMultiSelect
              id="modify-remove-metrics"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select Metrics to Remove"
            />
          </LabeledField>
        )}
      />
    </>
  );
}
