'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';

import { TAGS_HELP } from '../../_constants/evaluator-help-text';
import type { GenerateEvaluatorsFormValues } from '../../_schemas/generate-evaluators-form-schema';
import { LabeledField } from '../fields/labeled-field';
import { TagInput } from '../fields/tag-input/tag-input';

const EXTRA_PLACEHOLDER = `Generate scenarios where the user is trying to fake his identity
OR
Generate scenarios where the user is trying to cancel an appointment`;

export function GenerateExtraFields() {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();

  return (
    <>
      <Controller
        name="extraInstructions"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="generate-extra"
            label="Extra Instructions"
            description="Additional instructions for the LLM while generating scenarios."
            error={fieldState.error}
          >
            <Textarea
              {...field}
              id="generate-extra"
              placeholder={EXTRA_PLACEHOLDER}
              className="min-h-28"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <LabeledField id="generate-tags" label="Tags" description={TAGS_HELP}>
            <TagInput
              id="generate-tags"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
