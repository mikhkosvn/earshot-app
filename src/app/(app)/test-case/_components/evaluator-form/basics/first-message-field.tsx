'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { FIRST_MESSAGE_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { Input } from '@/components/ui/input';

import { LabeledField } from '../../fields/labeled-field';

export function FirstMessageField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="firstMessage"
      control={control}
      render={({ field }) => (
        <LabeledField
          id="evaluator-first-message"
          label="First Message"
          description={FIRST_MESSAGE_HELP}
        >
          <Input
            {...field}
            id="evaluator-first-message"
            className="bg-background"
          />
        </LabeledField>
      )}
    />
  );
}
