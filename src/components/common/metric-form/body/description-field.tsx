'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { MetricType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import {
  DESCRIPTION_HELP,
  DESCRIPTION_PLACEHOLDER,
} from '../_constants/metric-form-text';
import { useMetricFormType } from '../_hooks/use-metric-form-type';
import { ImproveButton } from '../improve/improve-button';
import { DescriptionRequiredMark } from './description-required-mark';

const FIELD_ID = 'metric-description';

export function DescriptionField() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const type = useMetricFormType();

  if (type === MetricType.custom_code) return null;

  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <FieldLabel htmlFor={FIELD_ID}>
                <span>
                  Description
                  <DescriptionRequiredMark />
                </span>
              </FieldLabel>
              <FieldDescription className="text-xs">
                {DESCRIPTION_HELP}
              </FieldDescription>
            </div>
            <ImproveButton />
          </div>
          <Textarea
            {...field}
            id={FIELD_ID}
            aria-invalid={fieldState.invalid}
            placeholder={DESCRIPTION_PLACEHOLDER}
            className="min-h-52"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
