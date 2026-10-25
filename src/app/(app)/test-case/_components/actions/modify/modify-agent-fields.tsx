'use client';

import { Controller, useFormContext, useWatch } from 'react-hook-form';

import type { ModifyEvaluatorsFieldsValues } from '@/server/evaluators/types';

import { TEST_PROFILE_HELP } from '../../../_constants/evaluator-help-text';
import { LabeledField } from '../../fields/labeled-field';
import { AgentSelect } from '../../fields/selects/agent-select';
import { PersonalitySelect } from '../../fields/selects/personality-select';
import { TestProfileSelect } from '../../fields/selects/test-profile-select';

export function ModifyAgentFields() {
  const { control, setValue } = useFormContext<ModifyEvaluatorsFieldsValues>();
  const agentId = useWatch({ control, name: 'agentId' });

  return (
    <>
      <Controller
        name="agentId"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-agent"
            label="Agent"
            description="Set the agent for all selected scenarios"
          >
            <AgentSelect
              id="modify-agent"
              value={field.value}
              onValueChange={(next) => {
                field.onChange(next);
                setValue('testProfileId', null);
              }}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="testProfileId"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-test-profile"
            label="Test Profile"
            description={TEST_PROFILE_HELP}
          >
            <TestProfileSelect
              id="modify-test-profile"
              agentId={agentId}
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="personalityId"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-personality"
            label="Personality"
            description="Change the personality for selected scenarios"
          >
            <PersonalitySelect
              id="modify-personality"
              value={field.value}
              onValueChange={field.onChange}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
