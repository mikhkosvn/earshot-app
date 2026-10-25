'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  INSTRUCTIONS_GUIDE,
  INSTRUCTIONS_HELP,
  INSTRUCTIONS_PLACEHOLDER,
} from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { insertAtCursor } from '@/app/(app)/test-case/_utils/insert-at-cursor';
import { TEST_PROFILE_TOKEN } from '@/app/(app)/test-case/_utils/variable-tokens';
import { Textarea } from '@/components/ui/textarea';
import { EvaluatorTextKind } from '@/server/evaluators/constants/evaluator-text-kind';

import { LabeledField } from '../../fields/labeled-field';
import { ProfileVariableChips } from '../variables/profile-variable-chips';
import { VariableHint } from '../variables/variable-hint';
import { ImproveTextButton } from './improve-text-button';

const FIELD_ID = 'evaluator-instructions';

export function InstructionsField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="instructions"
      control={control}
      render={({ field, fieldState }) => {
        const insert = (token: string) =>
          field.onChange(insertAtCursor(FIELD_ID, field.value, token));
        return (
          <LabeledField
            id={FIELD_ID}
            label="Instructions"
            description={INSTRUCTIONS_HELP}
            required
            error={fieldState.error}
            action={<ImproveTextButton kind={EvaluatorTextKind.instructions} />}
          >
            <Textarea
              {...field}
              id={FIELD_ID}
              placeholder={INSTRUCTIONS_PLACEHOLDER}
              aria-invalid={fieldState.invalid}
              className="min-h-64 bg-background text-sm"
            />
            <ProfileVariableChips
              baseTokens={[TEST_PROFILE_TOKEN]}
              onInsert={insert}
            />
            <VariableHint onInsert={insert} />
            <p className="text-xs text-muted-foreground">
              {INSTRUCTIONS_GUIDE}
            </p>
          </LabeledField>
        );
      }}
    />
  );
}
