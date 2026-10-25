'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Textarea } from '@/components/ui/textarea';
import type { ModifyEvaluatorsFieldsValues } from '@/server/evaluators/types';

import { LabeledField } from '../../fields/labeled-field';
import { ToolsMultiSelect } from '../../fields/multi-select/tools-multi-select';

export function ModifyInstructionFields() {
  const { control } = useFormContext<ModifyEvaluatorsFieldsValues>();

  return (
    <>
      <Controller
        name="appendInstructions"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-append-instructions"
            label="Append Instructions"
            description="Add additional instructions to the existing scenario instructions"
          >
            <Textarea
              {...field}
              id="modify-append-instructions"
              placeholder="Enter additional instructions to append..."
              className="min-h-32 bg-background"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="addTools"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-add-tools"
            label="Add Tools"
            description="Select tools to add to the scenarios. You can select multiple tools including all end call variants."
          >
            <ToolsMultiSelect
              id="modify-add-tools"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select Tools to Add"
            />
          </LabeledField>
        )}
      />
      <Controller
        name="removeTools"
        control={control}
        render={({ field }) => (
          <LabeledField
            id="modify-remove-tools"
            label="Remove Tools"
            description="Select tools to remove from the scenarios. You can remove any combination of tools."
          >
            <ToolsMultiSelect
              id="modify-remove-tools"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Select Tools to Remove"
            />
          </LabeledField>
        )}
      />
    </>
  );
}
