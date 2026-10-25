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
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { EVALUATION_TRIGGER_INFO } from '../_constants/metric-form-text';
import { triggerItems } from '../_utils/trigger-items';
import { InfoTooltip } from '../info-tooltip';
import { CustomTriggerFields } from './custom-trigger-fields';
import { GenerateTriggerButton } from './generate-trigger-button';

const FIELD_ID = 'metric-evaluation-trigger';

export function EvaluationTriggerField() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <div className="flex flex-col gap-4">
      <Controller
        name="evaluationTrigger"
        control={control}
        render={({ field, fieldState }) => {
          const items = triggerItems(field.value);
          return (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <div className="flex items-end justify-between gap-2">
                <div className="flex items-center gap-1">
                  <FieldLabel htmlFor={FIELD_ID}>
                    <span>
                      Evaluation Trigger{' '}
                      <span className="text-destructive">*</span>
                    </span>
                  </FieldLabel>
                  <InfoTooltip
                    label="About evaluation triggers"
                    text={EVALUATION_TRIGGER_INFO}
                  />
                </div>
                <GenerateTriggerButton />
              </div>
              <Select
                items={items}
                value={field.value}
                disabled={field.disabled}
                onValueChange={(value) => {
                  if (value === null) return;
                  field.onChange(value);
                }}
              >
                <SelectTrigger id={FIELD_ID} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </Field>
          );
        }}
      />
      <CustomTriggerFields />
    </div>
  );
}
