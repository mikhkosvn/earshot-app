'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { MetricDefinitionValues } from '@/server/metrics/types';

import { useMetricFormType } from '../_hooks/use-metric-form-type';
import { isMetricFormType } from '../_utils/metric-form-type';
import { JudgePythonToggle } from './judge-python-toggle';

export function MetricTypeSwitch() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const type = useMetricFormType();

  if (!isMetricFormType(type)) return null;

  return (
    <div className="border-b px-4 py-2">
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <JudgePythonToggle
            label="Metric form"
            value={field.value}
            onValueChange={field.onChange}
            disabled={field.disabled}
          />
        )}
      />
    </div>
  );
}
