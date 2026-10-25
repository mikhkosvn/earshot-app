'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { MetricType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { CUSTOM_CODE_HELP } from '../_constants/metric-form-text';
import { useMetricFormType } from '../_hooks/use-metric-form-type';
import { CodeEditor } from '../code-editor/code-editor';
import { ImproveButton } from '../improve/improve-button';

const FIELD_ID = 'metric-custom-code';

export function CustomCodeField() {
  const { control } = useFormContext<MetricDefinitionValues>();
  const type = useMetricFormType();

  if (type !== MetricType.custom_code) return null;

  return (
    <Controller
      name="customCode"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex items-end justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <FieldLabel htmlFor={FIELD_ID}>
                <span>
                  Custom Code (Python Only)
                  <span className="text-destructive">*</span>
                </span>
              </FieldLabel>
              <FieldDescription className="text-xs">
                {CUSTOM_CODE_HELP}
              </FieldDescription>
            </div>
            <ImproveButton />
          </div>
          <CodeEditor
            id={FIELD_ID}
            label="Custom Code (Python Only)"
            name={field.name}
            value={field.value}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
