'use client';

import { InfoIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GENERATION_MAX_SCENARIOS } from '@/server/evaluator-generation/constants';

import { FOLDER_HELP } from '../../_constants/evaluator-help-text';
import type { GenerateEvaluatorsFormValues } from '../../_schemas/generate-evaluators-form-schema';
import { LabeledField } from '../fields/labeled-field';
import { NullableNumberInput } from '../fields/nullable-number-input';
import { AgentSelect } from '../fields/selects/agent-select';
import { FolderSelect } from '../fields/selects/folder-select';

export function GenerateBasicFields() {
  const { control } = useFormContext<GenerateEvaluatorsFormValues>();

  return (
    <>
      <Controller
        name="agentId"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="generate-agent"
            label="Agent"
            description="Note - We leverage the description of the Main Agent for generating. It is important that you provide good detailed description."
            required
            error={fieldState.error}
          >
            <AgentSelect
              id="generate-agent"
              value={field.value}
              onValueChange={field.onChange}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="folderPath"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="generate-folder"
            label="Folder"
            description={FOLDER_HELP}
            required
            error={fieldState.error}
          >
            <FolderSelect
              id="generate-folder"
              value={field.value}
              onValueChange={(next) => field.onChange(next ?? '')}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
      <Controller
        name="numScenarios"
        control={control}
        render={({ field, fieldState }) => (
          <LabeledField
            id="generate-count"
            label="Number of Scenarios"
            required
            error={fieldState.error}
            action={
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span
                      aria-label="About the number of scenarios"
                      className="text-muted-foreground"
                    />
                  }
                >
                  <InfoIcon className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent>
                  {`The number of evaluators to generate, from 1 to ${GENERATION_MAX_SCENARIOS}.`}
                </TooltipContent>
              </Tooltip>
            }
          >
            <NullableNumberInput
              id="generate-count"
              value={field.value}
              onValueChange={(next) => field.onChange(next ?? Number.NaN)}
              min={1}
              max={GENERATION_MAX_SCENARIOS}
              invalid={fieldState.invalid}
            />
          </LabeledField>
        )}
      />
    </>
  );
}
