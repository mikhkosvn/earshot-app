'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  LANGUAGE_HELP,
  PERSONALITY_HELP,
} from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { LanguageSelect } from '../../fields/selects/language-select';
import { PersonalitySelect } from '../../fields/selects/personality-select';

export function PersonalityLanguageFields() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Controller
        name="personalityId"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="evaluator-personality"
            label="Personality"
            description={PERSONALITY_HELP}
            required
            error={fieldState.error}
          >
            <PersonalitySelect
              id="evaluator-personality"
              value={field.value}
              onValueChange={field.onChange}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="evaluator-language"
            label="Language"
            description={LANGUAGE_HELP}
          >
            <LanguageSelect
              id="evaluator-language"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </div>
  );
}
