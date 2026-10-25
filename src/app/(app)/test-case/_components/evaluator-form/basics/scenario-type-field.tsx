'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import { ScenarioType } from '@/generated/prisma/enums';
import { ScenarioInputTypeLabel } from '@/server/evaluators/constants/scenario-input-type-labels';

import { LabeledField } from '../../fields/labeled-field';
import { OptionSelect } from '../../fields/option-select';

const TYPE_ITEMS = Object.values(ScenarioType).map((type) => ({
  value: type,
  label: ScenarioInputTypeLabel[type],
}));

export function ScenarioTypeField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="scenarioType"
      control={control}
      render={({ field }) => (
        <LabeledField
          id="evaluator-scenario-type"
          label="Scenario Input Type"
          required
        >
          <OptionSelect
            id="evaluator-scenario-type"
            items={TYPE_ITEMS}
            value={field.value}
            onValueChange={(next) => {
              if (next === null) return;
              field.onChange(next);
            }}
            placeholder="Select type"
          />
        </LabeledField>
      )}
    />
  );
}
