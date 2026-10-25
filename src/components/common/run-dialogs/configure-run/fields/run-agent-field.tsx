'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { BotIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { useRunAgentChange } from '../../_hooks/use-run-agent-change';
import { RunDialogService } from '../../_service';
import { LabeledField } from '../../fields/labeled-field';
import { OptionSelect } from '../../fields/option-select';

interface RunAgentFieldProps {
  form: RunSettingsForm;
  evaluatorIds: number[];
}

const AGENT_HELP =
  'Note - We leverage the description of the agent for generating. It is important you provide good detailed description.';

export function RunAgentField({ form, evaluatorIds }: RunAgentFieldProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...RunDialogService.getAgentsQuery({ projectId }),
    select: (agents) =>
      agents.map((agent) => ({ value: agent.id, label: agent.name })),
  });
  const changeAgent = useRunAgentChange(form, evaluatorIds);

  return (
    <Controller
      control={form.control}
      name="agentId"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-agent"
          label="Agent"
          description={
            <>
              {AGENT_HELP} <span className="text-destructive">*</span>
            </>
          }
          error={fieldState.error}
        >
          <OptionSelect
            id="run-agent"
            ariaLabel="Agent"
            items={items}
            value={field.value ?? null}
            onValueChange={(agentId) => void changeAgent(agentId)}
            placeholder="Select an agent"
            icon={<BotIcon className="text-muted-foreground" />}
            invalid={fieldState.invalid}
          />
        </LabeledField>
      )}
    />
  );
}
