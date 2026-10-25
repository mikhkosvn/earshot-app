'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { LabeledField } from '@/app/(app)/test-case/_components/fields/labeled-field';
import { OptionRadioGroup } from '@/app/(app)/test-case/_components/fields/option-radio-group';
import { TagInput } from '@/app/(app)/test-case/_components/fields/tag-input/tag-input';
import type { GenerateEvaluatorsFormValues } from '@/app/(app)/test-case/_schemas/generate-evaluators-form-schema';
import { ScenarioType } from '@/generated/prisma/enums';
import { EvaluatorFormatLabel } from '@/server/evaluators/constants/scenario-input-type-labels';

const FORMAT_OPTIONS = Object.values(ScenarioType).map((type) => ({
  value: type,
  label: EvaluatorFormatLabel[type],
}));

type AiMoreOptionsProps = {
  isOpen: boolean;
};

export function AiMoreOptions({ isOpen }: AiMoreOptionsProps) {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();

  if (!isOpen) return null;

  return (
    <div className="grid gap-4 border-b p-3 md:grid-cols-2">
      <Controller
        name="evaluatorFormat"
        control={control}
        render={({ field }) => (
          <LabeledField id="ai-format" label="Evaluator Format">
            <OptionRadioGroup
              name="ai-format"
              options={FORMAT_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <LabeledField id="ai-tags" label="Tags">
            <TagInput
              id="ai-tags"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </div>
  );
}
