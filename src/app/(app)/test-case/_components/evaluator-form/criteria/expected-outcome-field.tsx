'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  EXPECTED_OUTCOME_GUIDE,
  EXPECTED_OUTCOME_PLACEHOLDER,
} from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { insertAtCursor } from '@/app/(app)/test-case/_utils/evaluator-form/insert-at-cursor';
import { OUTCOME_BASE_TOKENS } from '@/app/(app)/test-case/_utils/evaluator-form/variable-tokens';
import { Textarea } from '@/components/ui/textarea';
import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';

import { LabeledField } from '../../fields/labeled-field';
import { ProfileVariableChips } from '../variables/profile-variable-chips';
import { VariableHint } from '../variables/variable-hint';
import { ImproveTextButton } from './improve-text-button';

const FIELD_ID = 'evaluator-expected-outcome';

export function ExpectedOutcomeField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="expectedOutcomePrompt"
      control={control}
      render={({ field, fieldState }) => {
        const insert = (token: string) =>
          field.onChange(insertAtCursor(FIELD_ID, field.value, token));
        return (
          <LabeledField
            id={FIELD_ID}
            label="Expected Outcome Prompt"
            description="Enter the expected outcome prompt."
            error={fieldState.error}
            action={
              <ImproveTextButton kind={EvaluatorTextKind.expectedOutcome} />
            }
          >
            <Textarea
              {...field}
              id={FIELD_ID}
              placeholder={EXPECTED_OUTCOME_PLACEHOLDER}
              className="min-h-56 bg-background text-sm"
            />
            <ProfileVariableChips
              baseTokens={OUTCOME_BASE_TOKENS}
              onInsert={insert}
            />
            <VariableHint onInsert={insert} />
            <p className="text-xs text-muted-foreground">
              {EXPECTED_OUTCOME_GUIDE}
            </p>
          </LabeledField>
        );
      }}
    />
  );
}
