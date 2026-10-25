'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { RunDialogService } from '../../_service';
import { LabeledField } from '../../fields/labeled-field';
import { OptionMultiSelect } from '../../fields/option-multi-select';

interface RunTestProfilesFieldProps {
  control: RunSettingsForm['control'];
  agentId: number;
}

export function RunTestProfilesField({
  control,
  agentId,
}: RunTestProfilesFieldProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...RunDialogService.getTestProfilesQuery({ projectId, agentId }),
    select: (profiles) =>
      profiles.map((profile) => ({ value: profile.id, label: profile.name })),
  });

  return (
    <Controller
      control={control}
      name="testProfileIds"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-test-profiles"
          label="Test Profiles"
          description="Select the test profiles for the evaluation"
          error={fieldState.error}
        >
          <OptionMultiSelect
            id="run-test-profiles"
            options={options}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Select Test Profiles"
          />
        </LabeledField>
      )}
    />
  );
}
