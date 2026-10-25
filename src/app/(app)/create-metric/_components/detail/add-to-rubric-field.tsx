'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';
import { MetricEvalType } from '@/generated/prisma/enums';

import type { CreateMetricFormInput } from '../../_schemas/create-metric-form-schema';
import { RubricStateLabel } from './rubric-state-label';

const FIELD_ID = 'metric-add-to-rubric';

export function AddToRubricField() {
  const { control } = useFormContext<CreateMetricFormInput>();
  const evalType = useWatch<CreateMetricFormInput, 'evalType'>({
    name: 'evalType',
  });

  if (evalType !== MetricEvalType.binary) return null;

  return (
    <Controller
      name="addToRubric"
      control={control}
      render={({ field }) => (
        <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
          <label htmlFor={FIELD_ID} className="text-sm font-medium">
            Add to rubric rule
          </label>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Switch
              id={FIELD_ID}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <RubricStateLabel checked={field.value} />
          </div>
        </div>
      )}
    />
  );
}
