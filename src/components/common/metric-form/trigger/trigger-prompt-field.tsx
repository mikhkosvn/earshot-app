'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import {
  TRIGGER_PROMPT_HELP,
  TRIGGER_PROMPT_PLACEHOLDER,
} from '../_constants/metric-form-text';

const FIELD_ID = 'metric-trigger-prompt';

export function TriggerPromptField() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="evaluationTriggerPrompt"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID}>
              <span>
                Evaluation Trigger Prompt
                <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <FieldDescription className="text-xs">
              {TRIGGER_PROMPT_HELP}
            </FieldDescription>
          </div>
          <Textarea
            {...field}
            id={FIELD_ID}
            aria-invalid={fieldState.invalid}
            placeholder={TRIGGER_PROMPT_PLACEHOLDER}
            className="min-h-48"
          />
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
