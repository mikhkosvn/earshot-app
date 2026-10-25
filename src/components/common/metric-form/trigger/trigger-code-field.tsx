'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { TRIGGER_CODE_HELP } from '../_constants/metric-form-text';
import { PYTHON_VARIABLE_SET } from '../_constants/variable-sets';
import { CodeEditor } from '../code-editor/code-editor';
import { VariableBar } from '../variables/variable-bar';

const FIELD_ID = 'metric-trigger-code';

export function TriggerCodeField() {
  const { control } = useFormContext<MetricDefinitionValues>();

  return (
    <Controller
      name="evaluationTriggerCustomCode"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="gap-1.5" data-invalid={fieldState.invalid}>
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID}>
              <span>
                Evaluation Trigger Code (Python Only)
                <span className="text-destructive">*</span>
              </span>
            </FieldLabel>
            <FieldDescription className="text-xs">
              {TRIGGER_CODE_HELP}
            </FieldDescription>
          </div>
          <CodeEditor
            id={FIELD_ID}
            label="Evaluation Trigger Code (Python Only)"
            name={field.name}
            value={field.value}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          />
          <FieldError errors={[fieldState.error]} />
          <VariableBar set={PYTHON_VARIABLE_SET} />
        </Field>
      )}
    />
  );
}
