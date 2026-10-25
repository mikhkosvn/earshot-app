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
import { MetricEvalType } from '@/generated/prisma/enums';
import { MetricEvalTypeLabel } from '@/server/metrics/constants/metric-eval-type-labels';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { METRIC_TYPE_INFO } from '../_constants/metric-form-text';
import { InfoTooltip } from '../info-tooltip';

const FIELD_ID = 'metric-eval-type';

const EVAL_TYPE_ITEMS = [
  MetricEvalType.binary,
  MetricEvalType.continuous_qualitative,
  MetricEvalType.enum,
  MetricEvalType.numeric,
].map((value) => ({ value, label: MetricEvalTypeLabel[value] }));

export function MetricEvalTypeField() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="evalType"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-1">
            <FieldLabel htmlFor={FIELD_ID}>
              <span>
                Metric Type <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <InfoTooltip label="About metric types" text={METRIC_TYPE_INFO} />
          </div>
          <Select
            items={EVAL_TYPE_ITEMS}
            value={field.value ?? null}
            disabled={field.disabled}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger
              id={FIELD_ID}
              className="w-full"
              aria-invalid={fieldState.invalid}
              onBlur={field.onBlur}
            >
              <SelectValue placeholder="Select metric type" />
            </SelectTrigger>
            <SelectContent>
              {EVAL_TYPE_ITEMS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
