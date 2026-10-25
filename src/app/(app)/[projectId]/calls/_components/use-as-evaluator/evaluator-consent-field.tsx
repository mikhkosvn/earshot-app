'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

import type { UseAsEvaluatorFormValues } from '../../_schemas/use-as-evaluator-form-schema';

const FIELD_ID = 'evaluator-consent';

export function EvaluatorConsentField() {
  const { control } = useFormContext<UseAsEvaluatorFormValues>();

  return (
    <Controller
      name="consent"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex items-start gap-2">
            <Checkbox
              id={FIELD_ID}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              className="mt-0.5"
            />
            <FieldLabel htmlFor={FIELD_ID} className="text-xs/5 font-normal">
              I hereby confirm that I have all necessary rights or consents to
              upload and clone these scenarios and that I will not use the
              platform-generated content for any illegal, fraudulent, or harmful
              purpose.
            </FieldLabel>
          </div>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
