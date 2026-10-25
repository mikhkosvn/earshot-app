'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { useMetricFormType } from '@/components/common/metric-form/_hooks/use-metric-form-type';
import { isMetricFormType } from '@/components/common/metric-form/_utils/metric-form-type';
import { JudgePythonToggle } from '@/components/common/metric-form/identity/judge-python-toggle';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';

export function LabTypeTabs() {
  const { control } = useFormContext<LabMetricFormInput>();
  const type = useMetricFormType();

  if (!isMetricFormType(type)) return null;

  return (
    <Controller
      name="type"
      control={control}
      render={({ field }) => (
        <div className="w-fit rounded-lg bg-muted p-1">
          <JudgePythonToggle
            label="Metric form"
            value={field.value}
            onValueChange={field.onChange}
            disabled={field.disabled}
          />
        </div>
      )}
    />
  );
}
