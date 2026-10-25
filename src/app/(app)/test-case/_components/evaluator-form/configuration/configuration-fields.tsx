'use client';

import { Controller, useFormContext } from 'react-hook-form';

import {
  MAX_DURATION_HELP,
  MAX_DURATION_PLACEHOLDER,
  TOOLS_HELP,
} from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import {
  MAX_DURATION_MAX_SECONDS,
  MAX_DURATION_MIN_SECONDS,
} from '@/server/evaluators/constants/evaluator-limits';

import { LabeledField } from '../../fields/labeled-field';
import { NullableNumberInput } from '../../fields/nullable-number-input';
import { PhoneNumberSelect } from '../../fields/selects/phone-number-select';
import { ToolSwitchList } from '../../fields/tool-switch-list';

export function ConfigurationFields() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <>
      <Controller
        name="phoneNumberId"
        control={control}
        render={({ field }) => (
          <LabeledField id="evaluator-phone-number" label="Phone Number">
            <PhoneNumberSelect
              id="evaluator-phone-number"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="tools"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="evaluator-tools"
            label="Tools"
            description={TOOLS_HELP}
          >
            <ToolSwitchList
              idPrefix="evaluator-tools"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="maxDurationSeconds"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="evaluator-max-duration"
            label="Max Call Duration (seconds)"
            description={MAX_DURATION_HELP}
            error={fieldState.error}
          >
            <NullableNumberInput
              id="evaluator-max-duration"
              value={field.value}
              onValueChange={field.onChange}
              placeholder={MAX_DURATION_PLACEHOLDER}
              min={MAX_DURATION_MIN_SECONDS}
              max={MAX_DURATION_MAX_SECONDS}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
