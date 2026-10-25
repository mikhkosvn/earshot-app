'use client';

import { useWatch } from 'react-hook-form';

import { useMetricFormType } from '@/components/common/metric-form/_hooks/use-metric-form-type';
import { MetricType } from '@/generated/prisma/enums';

import type { LabMetricFormInput } from '../../_schemas/lab-metric-form-schema';
import {
  defaultVariables,
  textVariables,
  variableCode,
} from '../../_utils/variables-used';
import { RemovableVariableChip } from './removable-variable-chip';

export function VariablesUsed() {
  const type = useMetricFormType();
  const description = useWatch<LabMetricFormInput, 'description'>({
    name: 'description',
  });

  if (type === MetricType.custom_code) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
      <span className="font-medium">Variables used:</span>
      {defaultVariables(description).map((name) => (
        <span
          key={name}
          className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
        >
          {variableCode(name)}
        </span>
      ))}
      {textVariables(description).map((name) => (
        <RemovableVariableChip key={name} name={name} />
      ))}
    </div>
  );
}
