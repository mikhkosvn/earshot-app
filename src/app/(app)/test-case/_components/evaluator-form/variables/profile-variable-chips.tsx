'use client';

import { Suspense } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';

import { AgentProfileVariableChips } from './agent-profile-variable-chips';
import { VariableChips } from './variable-chips';

interface ProfileVariableChipsProps {
  baseTokens: readonly string[];
  onInsert: (token: string) => void;
}

export function ProfileVariableChips({
  baseTokens,
  onInsert,
}: ProfileVariableChipsProps) {
  const { control } = useFormContext<EvaluatorFormValues>();
  const [agentId, testProfileId] = useWatch({
    control,
    name: ['agentId', 'testProfileId'],
  });
  const fallback = <VariableChips tokens={baseTokens} onInsert={onInsert} />;

  if (agentId === null || testProfileId === null) return fallback;
  return (
    <Suspense fallback={fallback}>
      <AgentProfileVariableChips
        agentId={agentId}
        testProfileId={testProfileId}
        baseTokens={baseTokens}
        onInsert={onInsert}
      />
    </Suspense>
  );
}
