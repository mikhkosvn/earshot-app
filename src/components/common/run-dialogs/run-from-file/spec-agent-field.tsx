'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import type { RunFromFileForm } from '../_hooks/use-run-from-file-form';
import { RunDialogService } from '../_service';
import { LabeledField } from '../fields/labeled-field';
import { OptionSelect } from '../fields/option-select';

type SpecAgentFieldProps = {
  control: RunFromFileForm['control'];
};

export function SpecAgentField({ control }: SpecAgentFieldProps) {
  const projectId = useCurrentProjectId();
  const { data: items } = useSuspenseQuery({
    ...RunDialogService.getAgentsQuery({ projectId }),
    select: (agents) =>
      agents.map((agent) => ({ value: agent.id, label: agent.name })),
  });

  return (
    <Controller
      control={control}
      name="agentId"
      render={({ field, fieldState }) => (
        <LabeledField id="spec-agent" label="Agent" error={fieldState.error}>
          <OptionSelect
            id="spec-agent"
            ariaLabel="Agent"
            items={items}
            value={field.value ?? null}
            onValueChange={field.onChange}
            placeholder="Select an agent"
            invalid={fieldState.invalid}
          />
        </LabeledField>
      )}
    />
  );
}
