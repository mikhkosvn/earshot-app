'use client';

import { Suspense } from 'react';

import { OptionSelect } from '../option-select';
import { AgentTestProfileSelect } from './agent-test-profile-select';

interface TestProfileSelectProps {
  id?: string;
  agentId: number | null;
  value: number | null;
  onValueChange: (testProfileId: number | null) => void;
  placeholder?: string;
  invalid?: boolean;
}

export function TestProfileSelect({
  agentId,
  ...props
}: TestProfileSelectProps) {
  const pending = (
    <OptionSelect
      items={[]}
      value={null}
      onValueChange={props.onValueChange}
      placeholder="Select an agent first"
      disabled
    />
  );

  if (agentId === null) return pending;
  return (
    <Suspense fallback={pending}>
      <AgentTestProfileSelect agentId={agentId} {...props} />
    </Suspense>
  );
}
