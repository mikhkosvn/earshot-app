'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { TEST_PROFILE_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { TestProfileSelect } from '../../fields/selects/test-profile-select';

export function TestProfileField() {
  const { control } = useFormContext<EvaluatorFormValues>();
  const agentId = useWatch({ control, name: 'agentId' });

  return (
    <Controller
      name="testProfileId"
      control={control}
      render={({ field, fieldState }) => (
        <LabeledField
          id="evaluator-test-profile"
          label="Test Profile"
          description={TEST_PROFILE_HELP}
          error={fieldState.error}
        >
          <TestProfileSelect
            id="evaluator-test-profile"
            agentId={agentId}
            value={field.value}
            onValueChange={field.onChange}
          />
        </LabeledField>
      )}
    />
  );
}
