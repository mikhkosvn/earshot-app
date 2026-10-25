'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';
import { MetricType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { AUDIO_HELP } from '../_constants/metric-form-text';
import { useMetricFormType } from '../_hooks/use-metric-form-type';

const FIELD_ID = 'metric-audio-enabled';

export function AudioField() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const type = useMetricFormType();

  if (type !== MetricType.llm_judge) return null;

  return (
    <Controller
      name="audioEnabled"
      control={control}
      render={({ field }) => (
        <div className="flex items-start justify-between gap-4 rounded-lg border bg-muted/30 px-3 py-2.5">
          <div className="flex flex-col gap-1">
            <label htmlFor={FIELD_ID} className="text-sm font-medium">
              Use voice recording
            </label>
            <p className="text-xs text-muted-foreground">{AUDIO_HELP}</p>
          </div>
          <Switch
            id={FIELD_ID}
            checked={field.value}
            disabled={field.disabled}
            onCheckedChange={field.onChange}
          />
        </div>
      )}
    />
  );
}
