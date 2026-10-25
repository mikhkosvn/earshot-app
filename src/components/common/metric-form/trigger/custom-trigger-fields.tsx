'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { EvaluationTrigger } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { JudgePythonToggle } from '../identity/judge-python-toggle';
import { TriggerBody } from './trigger-body';

export function CustomTriggerFields() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const trigger = useWatch<MetricDefinitionValues, 'evaluationTrigger'>({
    name: 'evaluationTrigger',
  });

  if (trigger !== EvaluationTrigger.custom) return null;

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="triggerType"
        control={control}
        render={({ field }) => (
          <JudgePythonToggle
            label="Trigger form"
            value={field.value}
            disabled={field.disabled}
            onValueChange={field.onChange}
          />
        )}
      />
      <TriggerBody />
    </div>
  );
}
