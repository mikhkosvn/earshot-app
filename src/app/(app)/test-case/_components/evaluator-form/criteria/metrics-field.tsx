'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { METRICS_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { MetricsMultiSelect } from '../../fields/multi-select/metrics-multi-select';

export function MetricsField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="metricIds"
      control={control}
      render={({ field }) => (
        <LabeledField
          id="evaluator-metrics"
          label="Metrics"
          description={METRICS_HELP}
        >
          <MetricsMultiSelect
            id="evaluator-metrics"
            value={field.value}
            onValueChange={field.onChange}
          />
        </LabeledField>
      )}
    />
  );
}
