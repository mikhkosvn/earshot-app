'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import type { TestProfileFormValues } from '../../../../_schemas/test-profile-form-schema';

export function VariableCount() {
  const { control } = useFormContext<TestProfileFormValues>();
  const [mainAgentVariables, testingAgentVariables] = useWatch({
    control,
    name: ['mainAgentVariables', 'testingAgentVariables'],
  });
  const count = [...mainAgentVariables, ...testingAgentVariables].filter(
    (variable) => variable.key.trim(),
  ).length;

  return (
    <span className="text-xs text-muted-foreground">
      {count} variables defined
    </span>
  );
}
