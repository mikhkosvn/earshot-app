'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { TAGS_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { TagInput } from '../../fields/tag-input/tag-input';

export function TagsField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field, fieldState }) => (
        <LabeledField
          id="evaluator-tags"
          label="Tags"
          description={TAGS_HELP}
          error={fieldState.error}
        >
          <TagInput
            id="evaluator-tags"
            value={field.value}
            onValueChange={field.onChange}
          />
        </LabeledField>
      )}
    />
  );
}
