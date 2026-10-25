'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Controller } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import type { RunSettingsForm } from '../../_hooks/use-configure-run-form';
import { RunDialogService } from '../../_service';
import { LabeledField } from '../../fields/labeled-field';
import { OptionMultiSelect } from '../../fields/option-multi-select';

interface RunPersonalitiesFieldProps {
  control: RunSettingsForm['control'];
}

export function RunPersonalitiesField({ control }: RunPersonalitiesFieldProps) {
  const projectId = useCurrentProjectId();
  const { data: options } = useSuspenseQuery({
    ...RunDialogService.getPersonalitiesQuery({ projectId }),
    select: (personalities) =>
      personalities.map((personality) => ({
        value: personality.id,
        label: personality.name,
      })),
  });

  return (
    <Controller
      control={control}
      name="personalityIds"
      render={({ field, fieldState }) => (
        <LabeledField
          id="run-personalities"
          label="Personalities"
          description="Select the personalities for the AI evaluator"
          error={fieldState.error}
        >
          <OptionMultiSelect
            id="run-personalities"
            options={options}
            value={field.value}
            onValueChange={field.onChange}
            placeholder="Select Personalities"
          />
        </LabeledField>
      )}
    />
  );
}
