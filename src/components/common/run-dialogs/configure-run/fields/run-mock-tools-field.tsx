'use client';

import { Controller } from 'react-hook-form';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { useSelectedRunAgent } from '../../_hooks/use-selected-run-agent';
import { LabeledField } from '../../fields/labeled-field';
import { OptionMultiSelect } from '../../fields/option-multi-select';

type RunMockToolsFieldProps = {
  control: RunSettingsForm['control'];
  evaluatorIds: number[];
};

export function RunMockToolsField({
  control,
  evaluatorIds,
}: RunMockToolsFieldProps) {
  const agent = useSelectedRunAgent(control, evaluatorIds);
  if (!agent || agent.mockTools.length === 0) return null;
  const options = agent.mockTools.map((tool) => ({
    value: tool.id,
    label: tool.name,
  }));

  return (
    <Controller
      control={control}
      name="mockToolIds"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-mock-tools"
          label="Mock Tools"
          description="Select mock tools to activate for this run"
          error={fieldState.error}
        >
          <OptionMultiSelect
            id="run-mock-tools"
            options={options}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Select mock tools"
          />
        </LabeledField>
      )}
    />
  );
}
