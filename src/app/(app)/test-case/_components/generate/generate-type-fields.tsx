'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { ScenarioType } from '@/generated/prisma/enums';
import {
  GenerationScenarioType,
  GenerationScenarioTypeLabel,
} from '@/server/evaluator-generation/constants';
import { EvaluatorFormatLabel } from '@/server/evaluators/constants/scenario-input-type-labels';

import type { GenerateEvaluatorsFormValues } from '../../_schemas/generate-evaluators-form-schema';
import { LabeledField } from '../fields/labeled-field';
import { OptionRadioGroup } from '../fields/option-radio-group';

const SCENARIO_TYPE_OPTIONS = Object.values(GenerationScenarioType).map(
  (type) => ({ value: type, label: GenerationScenarioTypeLabel[type] }),
);

const FORMAT_OPTIONS = Object.values(ScenarioType).map((type) => ({
  value: type,
  label: EvaluatorFormatLabel[type],
}));

export function GenerateTypeFields() {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();

  return (
    <>
      <Controller
        name="scenarioType"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-scenario-type"
            label="Scenario Type"
            description="Select the type of scenario to generate"
          >
            <OptionRadioGroup
              name="generate-scenario-type"
              options={SCENARIO_TYPE_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="evaluatorFormat"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-format"
            label="Evaluator Format"
            description="Choose a flexible prompt or a deterministic condition/action flow"
          >
            <OptionRadioGroup
              name="generate-format"
              options={FORMAT_OPTIONS}
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
