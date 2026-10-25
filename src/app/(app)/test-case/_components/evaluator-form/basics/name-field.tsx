'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Input } from '@/components/ui/input';

import { LabeledField } from '../../fields/labeled-field';

export function NameField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <LabeledField
          id="evaluator-name"
          label="AI Evaluator Name"
          required
          error={fieldState.error}
        >
          <Input
            {...field}
            id="evaluator-name"
            aria-invalid={fieldState.invalid}
            className="bg-background"
          />
        </LabeledField>
      )}
    />
  );
}
