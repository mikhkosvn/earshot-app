'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { FOLDER_HELP } from '@/app/(app)/test-case/_constants/evaluator-help-text';
import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { LabeledField } from '../../fields/labeled-field';
import { FolderSelect } from '../../fields/selects/folder-select';

export function FolderField() {
  const { control } = useFormContext<EvaluatorFormValues>();

  return (
    <Controller
      name="folderPath"
      control={control}
      render={({ field, fieldState }) => (
        <LabeledField
          id="evaluator-folder"
          label="Folder"
          description={FOLDER_HELP}
          required
          error={fieldState.error}
        >
          <FolderSelect
            id="evaluator-folder"
            value={field.value || null}
            onValueChange={(next) => field.onChange(next ?? '')}
            invalid={fieldState.invalid}
          />
        </LabeledField>
      )}
    />
  );
}
