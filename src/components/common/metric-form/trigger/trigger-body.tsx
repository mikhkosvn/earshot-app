'use client';

import { useWatch } from 'react-hook-form';

import { TriggerType } from '@/generated/prisma/enums';
import type { MetricDefinitionValues } from '@/server/metrics/types';

import { JUDGE_VARIABLE_SET } from '../_constants/variable-sets';
import { VariableBar } from '../variables/variable-bar';
import { TriggerCodeField } from './trigger-code-field';
import { TriggerPromptField } from './trigger-prompt-field';

export function TriggerBody() {
  const triggerType = useWatch<MetricDefinitionValues, 'triggerType'>({
    name: 'triggerType',
  });

  if (triggerType === TriggerType.custom_code) return <TriggerCodeField />;

  return (
    <div className="flex flex-col gap-2">
      <TriggerPromptField />
      <VariableBar set={JUDGE_VARIABLE_SET} />
    </div>
  );
}
