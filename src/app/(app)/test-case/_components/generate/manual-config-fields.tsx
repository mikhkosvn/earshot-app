'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import {
  TEST_PROFILE_HELP,
  TOOLS_HELP,
} from '../../_constants/evaluator-help-text';
import type { GenerateEvaluatorsFormValues } from '../../_schemas/generate-evaluators-form-schema';
import { LabeledField } from '../fields/labeled-field';
import { PersonalityMultiSelect } from '../fields/multi-select/personality-multi-select';
import { PhoneNumberSelect } from '../fields/selects/phone-number-select';
import { TestProfileSelect } from '../fields/selects/test-profile-select';
import { ToolSwitchList } from '../fields/tool-switch-list';

export function ManualConfigFields() {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();
  const agentId = useWatch({ control, name: 'agentId' });

  return (
    <>
      <Controller
        name="testProfileId"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-test-profile"
            label="Test Profile"
            description={TEST_PROFILE_HELP}
          >
            <TestProfileSelect
              id="generate-test-profile"
              agentId={agentId}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Auto-generate"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="phoneNumberId"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-phone-number"
            label="Phone Numbers"
            description="Our Agent will call your agent using these numbers"
          >
            <PhoneNumberSelect
              id="generate-phone-number"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select phone numbers"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="personalityIds"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-personalities"
            label="Personalities"
            description="Select the personalities that the AI will use."
          >
            <PersonalityMultiSelect
              id="generate-personalities"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="AI will select automatically"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="firstMessage"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-first-message"
            label="First Message"
            description="Enter the first message to be sent."
          >
            <Input
              id="generate-first-message"
              value={field.value ?? ''}
              placeholder="AI will generate automatically"
              onChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="tools"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="generate-tools"
            label="Tools"
            description={TOOLS_HELP}
          >
            <ToolSwitchList
              idPrefix="generate-tools"
              value={field.value ?? []}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
