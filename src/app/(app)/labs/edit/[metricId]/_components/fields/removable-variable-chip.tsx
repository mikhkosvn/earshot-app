'use client';

import { XIcon } from 'lucide-react';
import { useFormContext, useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import { removeVariable, variableCode } from '../../_utils/variables-used';

type RemovableVariableChipProps = {
  name: string;
};

const SET_OPTIONS = { shouldDirty: true };

export function RemovableVariableChip({ name }: RemovableVariableChipProps) {
  const { getValues, setValue } = useFormContext<LabMetricFormInput>();
  const { disabled } = useFormState<LabMetricFormInput>();
  const code = variableCode(name);

  return (
    <span className="inline-flex items-center gap-1 rounded-md border py-0.5 pr-0.5 pl-2 text-xs text-muted-foreground">
      {code}
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Delete ${code}`}
        disabled={disabled}
        onClick={() =>
          setValue(
            'description',
            removeVariable(getValues('description'), name),
            SET_OPTIONS,
          )
        }
      >
        <XIcon />
      </Button>
    </span>
  );
}
