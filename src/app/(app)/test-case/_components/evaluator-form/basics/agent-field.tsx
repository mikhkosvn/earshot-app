'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { AGENT_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import { useAgentChangeHandler } from '@/app/(app)/test-case/_hooks/evaluator-form/use-agent-change-handler';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { AgentSelect } from '../../fields/selects/agent-select';

export function AgentField() {
  const { control } = useFormContext<EvaluatorFormValues>();
  const onAgentChange = useAgentChangeHandler();

  return (
    <Controller
      name="agentId"
      control={control}
      render={({ field, fieldState }) => (
        <LabeledField
          id="evaluator-agent"
          label="Agent"
          description={AGENT_HELP}
          required
          error={fieldState.error}
        >
          <AgentSelect
            id="evaluator-agent"
            value={field.value}
            onValueChange={(agentId) => void onAgentChange(agentId)}
            invalid={fieldState.invalid}
          />
        </LabeledField>
      )}
    />
  );
}
